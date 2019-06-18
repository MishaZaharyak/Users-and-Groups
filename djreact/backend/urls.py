from rest_framework import routers
from backend.api import UserViewSet, GroupViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('groups', GroupViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
