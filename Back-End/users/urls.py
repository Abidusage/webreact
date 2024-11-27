from django.urls import path
from .api import register, login, user_list, dashboard, get_specifique_resource, add_resource, get_all_profiles, detailprofile, get_all_resources, delete_resource, update_resource

urlpatterns = [
    path('api/register/', register, name='register'),
    path('api/token/', login, name='login'),
    path('api/dashboard/', dashboard, name='dashboard'),
    path('api/detailprofile/', detailprofile, name='add_profile'),
    path('api/add_resource/', add_resource, name='add_resource'),
    path('api/resources/', get_all_resources, name='get_all_resources'),
    path('api/list_users/', user_list, name='user-list'),
    path('api/resources/<int:id>/', get_specifique_resource, name='list_resource'),
    path('api/resources/delete/<int:id>/', delete_resource, name='delete_resource'),
    path('api/resources/update/<int:id>/', update_resource, name='update_resource'),  # Ajouté pour la mise à jour
    path('api/get_all_profiles/', get_all_profiles, name='api/get_all_profiles'),
]
