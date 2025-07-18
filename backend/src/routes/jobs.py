from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.models.user import db, User
from src.models.job import Job
from src.models.application import Application

jobs_bp = Blueprint('jobs', __name__)

@jobs_bp.route('/jobs', methods=['POST'])
@jwt_required()
def create_job():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or user.user_type != 'employer':
            return jsonify({'error': 'Apenas empregadores podem criar vagas'}), 403
        
        data = request.get_json()
        
        # Validação dos campos obrigatórios
        required_fields = ['title', 'description', 'location', 'contract_type', 'company_name']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'Campo {field} é obrigatório'}), 400
        
        # Criar nova vaga
        new_job = Job(
            title=data['title'],
            description=data['description'],
            location=data['location'],
            contract_type=data['contract_type'],
            salary_range=data.get('salary_range'),
            company_name=data['company_name'],
            employer_id=current_user_id
        )
        
        db.session.add(new_job)
        db.session.commit()
        
        return jsonify({
            'message': 'Vaga criada com sucesso',
            'job': new_job.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@jobs_bp.route('/jobs', methods=['GET'])
def get_jobs():
    try:
        # Parâmetros de filtro
        title_filter = request.args.get('title', '')
        location_filter = request.args.get('location', '')
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))
        
        # Query base
        query = Job.query.filter_by(is_active=True)
        
        # Aplicar filtros
        if title_filter:
            query = query.filter(Job.title.ilike(f'%{title_filter}%'))
        
        if location_filter:
            query = query.filter(Job.location.ilike(f'%{location_filter}%'))
        
        # Ordenar por data de criação (mais recentes primeiro)
        query = query.order_by(Job.created_at.desc())
        
        # Paginação
        jobs = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return jsonify({
            'jobs': [job.to_dict() for job in jobs.items],
            'total': jobs.total,
            'pages': jobs.pages,
            'current_page': page,
            'per_page': per_page
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@jobs_bp.route('/jobs/<int:job_id>', methods=['GET'])
def get_job(job_id):
    try:
        job = Job.query.get(job_id)
        
        if not job or not job.is_active:
            return jsonify({'error': 'Vaga não encontrada'}), 404
        
        return jsonify({'job': job.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@jobs_bp.route('/jobs/<int:job_id>/apply', methods=['POST'])
@jwt_required()
def apply_to_job(job_id):
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or user.user_type != 'candidate':
            return jsonify({'error': 'Apenas candidatos podem se candidatar a vagas'}), 403
        
        # Verificar se a vaga existe
        job = Job.query.get(job_id)
        if not job or not job.is_active:
            return jsonify({'error': 'Vaga não encontrada'}), 404
        
        # Verificar se já se candidatou
        existing_application = Application.query.filter_by(
            candidate_id=current_user_id,
            job_id=job_id
        ).first()
        
        if existing_application:
            return jsonify({'error': 'Você já se candidatou a esta vaga'}), 400
        
        # Criar nova candidatura
        new_application = Application(
            candidate_id=current_user_id,
            job_id=job_id
        )
        
        db.session.add(new_application)
        db.session.commit()
        
        return jsonify({
            'message': 'Candidatura realizada com sucesso',
            'application': new_application.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@jobs_bp.route('/employer/jobs', methods=['GET'])
@jwt_required()
def get_employer_jobs():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or user.user_type != 'employer':
            return jsonify({'error': 'Apenas empregadores podem acessar esta rota'}), 403
        
        jobs = Job.query.filter_by(employer_id=current_user_id).order_by(Job.created_at.desc()).all()
        
        return jsonify({
            'jobs': [job.to_dict() for job in jobs]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@jobs_bp.route('/employer/jobs/<int:job_id>/applications', methods=['GET'])
@jwt_required()
def get_job_applications(job_id):
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or user.user_type != 'employer':
            return jsonify({'error': 'Apenas empregadores podem acessar esta rota'}), 403
        
        # Verificar se a vaga pertence ao empregador
        job = Job.query.filter_by(id=job_id, employer_id=current_user_id).first()
        if not job:
            return jsonify({'error': 'Vaga não encontrada'}), 404
        
        applications = Application.query.filter_by(job_id=job_id).order_by(Application.applied_at.desc()).all()
        
        return jsonify({
            'job': job.to_dict(),
            'applications': [app.to_dict() for app in applications]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

