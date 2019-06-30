from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('backend.urls')),
    path('', include('accounts.urls')),
]
