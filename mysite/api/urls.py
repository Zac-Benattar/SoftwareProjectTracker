from django.urls import path , include
from . import views 
from rest_framework import routers
from api.views import * 

router = routers.DefaultRouter()
router.register(r'projects', Project )
router.register(r'tasks', Task )


urlpatterns = [
    path('', include(router.urls)),
]