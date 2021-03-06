from django.db import models
from django.contrib.auth.models import User


class UserModel(models.Model):
    username = models.CharField(max_length=50, unique=True)
    group = models.ForeignKey('Group', on_delete=models.CASCADE, null=True)
    created = models.DateField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.username


class Group(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
