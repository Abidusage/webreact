from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    account = models.OneToOneField(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=500, null=False)
    descriptions = models.CharField(max_length=500, null=False)
    phone = models.CharField(max_length=16, unique=True, null=False)
    state = models.CharField(max_length=60, null=False)
    link_upwork = models.CharField(max_length=100, null=False, unique=True)
    link_github = models.CharField(max_length=100, null=False, unique=True)
    link_linkedin = models.CharField(max_length=100, null=False, unique=True)
    stackoverflow = models.CharField(max_length=100, null=False, unique=True)

    def __str__(self) -> str:
        return self.link_github

class Resource(models.Model):
    name = models.CharField(max_length=250, null=False, unique=True)
    categories = models.CharField(max_length=250, null=False)
    descriptions = models.TextField(blank=False, unique=True)
    link = models.CharField(max_length=250, null=False)
    created_at = models.DateField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resources')

    def __str__(self):
        return self.author

class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    can_add_resources = models.BooleanField(default=True)

    def __str__(self):
        return self.user.username
