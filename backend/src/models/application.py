from datetime import datetime
from src.models.user import db

class Application(db.Model):
    __tablename__ = 'applications'
    
    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)
    applied_at = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(50), default='pending')  # pending, reviewed, accepted, rejected
    
    # Relacionamentos
    candidate = db.relationship('User', backref=db.backref('applications', lazy=True))
    job = db.relationship('Job', backref=db.backref('applications', lazy=True))
    
    # Constraint para evitar candidaturas duplicadas
    __table_args__ = (db.UniqueConstraint('candidate_id', 'job_id', name='unique_application'),)
    
    def to_dict(self):
        return {
            'id': self.id,
            'candidate_id': self.candidate_id,
            'job_id': self.job_id,
            'applied_at': self.applied_at.isoformat() if self.applied_at else None,
            'status': self.status,
            'candidate_name': self.candidate.name if self.candidate else None,
            'candidate_email': self.candidate.email if self.candidate else None,
            'job_title': self.job.title if self.job else None
        }

