from datetime import datetime
from src.models.user import db

class Job(db.Model):
    __tablename__ = 'jobs'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    contract_type = db.Column(db.String(50), nullable=False)  # CLT, PJ, Estágio, etc.
    salary_range = db.Column(db.String(100), nullable=True)
    company_name = db.Column(db.String(100), nullable=False)
    employer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    
    # Relacionamento com o empregador
    employer = db.relationship('User', backref=db.backref('jobs', lazy=True))
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'location': self.location,
            'contract_type': self.contract_type,
            'salary_range': self.salary_range,
            'company_name': self.company_name,
            'employer_id': self.employer_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'is_active': self.is_active
        }

