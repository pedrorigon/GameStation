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
    path('avaliar_jogo/', views.api_post),
    path('aceitar_jogo/', views.api_post),
    path('colocar_jogo_em_oferta/', views.api_post),
    path('comprar_jogo_ofertado/', views.api_post),
    path('anunciar_jogo_troca/', views.api_post),
    path('comprar_jogo/', views.api_post),
    path('adicionar_jogo/', views.api_post),
    path('login/', views.api_post),
    path('aumentar_saldo/', views.api_post),
    path('propor_troca/', views.api_post),
    path('aceitar_troca/', views.api_post),

    path('remover_jogo/', views.api_delete),
    path('remove_oferta/', views.api_delete),
    path('remover_proposta/', views.api_delete),

    path('listar_jogos_em_aguardo/', views.api_get),
    path('listar_propostas_recebidas/', views.api_get),
    path('listar_lucro/', views.api_get),
    path('listar_avaliacoes/', views.api_get),
    path('pesquisar_jogos_nome/', views.api_get),
    path('pesquisar_jogos_tag/', views.api_get),
    path('listar_jogos_usuario/', views.api_get),
    path('pesquisar_jogos_avaliacao/', views.api_get),
    path('listar_ofertas/', views.api_get),
    path('listar_trocas/', views.api_get),
    path('listar_saldo/', views.api_get),
    path('listar_jogos/', views.api_get),
]
