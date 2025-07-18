from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    user_type = db.Column(db.String(20), nullable=False)  # 'candidate' or 'employer'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Campos específicos para candidatos
    phone = db.Column(db.String(20), nullable=True)
    resume_url = db.Column(db.String(255), nullable=True)
    
    # Campos específicos para empregadores
    company_name = db.Column(db.String(100), nullable=True)
    company_description = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f'<User {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'user_type': self.user_type,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'phone': self.phone,
            'resume_url': self.resume_url,
            'company_name': self.company_name,
            'company_description': self.company_description
        }
