"""GameStation URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('biblioteca/', views.api_generic),
    path('loja/', views.api_generic),
    path('comprar_jogo/', views.api_generic),
    path('ofertas/', views.api_generic),
    path('trocas/', views.api_generic),
    path('propostas/', views.api_generic),
    path('comprar_oferta/', views.api_generic),
    path('aceitar_troca/', views.api_generic),
    path('validar_jogo/', views.api_generic),
    path('jogo/', views.api_generic),
    path('user_info/', views.api_generic),
    path('avaliacoes/', views.api_generic),
    path('aumentar_saldo/', views.api_generic),
    path('historico/', views.api_generic),
    path('session/', views.session),
]
