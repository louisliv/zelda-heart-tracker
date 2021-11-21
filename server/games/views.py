from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import (CollectibleCategory, Manufacturer, System, Game, Collectible,
    GameProfile, GameList)
from .serializers import (CollectibleCategorySerializer, ManufacturerSerializer, SystemSerializer,
    GameSerializer, CollectibleSerializer, GameProfileSerializer,
    GameListSerializer)

# Create your views here.
class ManufacturerViewSet(viewsets.ModelViewSet):
    queryset = Manufacturer.objects.all()
    serializer_class = ManufacturerSerializer
    permission_classes = ()

class SystemViewSet(viewsets.ModelViewSet):
    queryset = System.objects.all()
    serializer_class = SystemSerializer
    permission_classes = ()

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = ()

class CollectibleViewSet(viewsets.ModelViewSet):
    serializer_class = CollectibleSerializer
    permission_classes = ()

    def get_queryset(self):
        queryset = Collectible.objects.all()
        game = self.request.query_params.get('game', None)
        if game is not None:
            queryset = queryset.filter(game=game)

        return queryset

    @action(methods=['get'], detail=False)
    def by_category(self, request):
        game_id = request.query_params.get('game', None)

        try:
            print(game_id)
            categories = CollectibleCategory.objects.filter(
                game_id=game_id
            )
            print(categories)
        except CollectibleCategory.DoesNotExist:
            return Response(None, status=status.HTTP_404_NOT_FOUND)

        return Response(CollectibleCategorySerializer(categories, many=True).data)


class GameProfileViewSet(viewsets.ModelViewSet):
    serializer_class = GameProfileSerializer
    permission_classes = ()

    def get_queryset(self):
        return GameProfile.objects.filter(
            user=self.request.user)

    def create(self, request):
        data = request.data
        game = data.get('game', None)
        name = data.get('name', None)

        profile = GameProfile.objects.create(
            game=Game.objects.get(pk=game),
            name=name,
            user=request.user
        )

        return Response(GameProfileSerializer(profile).data,
            status=status.HTTP_201_CREATED)

    @action(methods=['get'], detail=False)
    def by_game(self, request):
        game_id = request.query_params.get('game', None)

        if game_id and request.user.is_authenticated:
            try:
                profile = GameProfile.objects.get(
                    user=request.user,
                    game=game_id
                )
                return Response(GameProfileSerializer(profile).data)
            except GameProfile.DoesNotExist:
                return Response(None, status=status.HTTP_404_NOT_FOUND)

        return Response(None, status=status.HTTP_404_NOT_FOUND)


    @action(methods=['post'], detail=True)
    def add_collectible(self, request, pk=None):
        profile = self.get_object()
        collectible = request.data.get('id', None)

        if collectible:
            profile.collectibles.add(
                Collectible.objects.get(pk=collectible)
            )
            return Response(GameProfileSerializer(profile).data, 
                status=status.HTTP_201_CREATED)

        return Response({}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=True)
    def remove_collectible(self, request, pk=None):
        profile = self.get_object()
        collectible = request.data.get('id', None)

        if collectible:
            profile.collectibles.remove(
                Collectible.objects.get(pk=collectible)
            )
            return Response(GameProfileSerializer(profile).data, 
                status=status.HTTP_201_CREATED)

        return Response({}, status=status.HTTP_400_BAD_REQUEST)


class GameListViewSet(viewsets.ModelViewSet):
    serializer_class = GameListSerializer
    permission_classes = ()

    def get_queryset(self):
        return GameList.objects.filter(
            user=self.request.user)

    @action(methods=['post'], detail=False)
    def add_game(self, request):
        game_list = GameList.objects.get(user=request.user.id)
        data=request.data
        game = Game.objects.get(pk=data['id'])
        game_list.games.add(game)
        game_list.refresh_from_db()
        serializer = GameListSerializer(game_list)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True)
    def profiles(self, request, pk=None):
        game = Game.objects.get(pk=pk)
        profiles = GameProfile.objects.filter(
            user=request.user.id, game=game)
        serializer = GameProfileSerializer(profiles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)