from rest_framework import viewsets, generics, mixins
from backend.serializers import UserSerializer, GroupSerializer
from backend.models import UserModel, Group
from rest_framework.response import Response
from rest_framework import status


class UserViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.order_by('created')
    serializer_class = UserSerializer
    group_serializer = GroupSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        groups = self.group_serializer(
            Group.objects.all(), many=True, fields=('id', 'name'))

        serializer = self.get_serializer(page, many=True)
        data = {
            "users_list": serializer.data,
            "groups_list": groups.data
        }

        if page is not None:
            return self.get_paginated_response(data)

        return Response(data)


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        id = instance.id

        if instance.usermodel_set.all().count() > 0:
            return Response({
                'message': 'This model has a users'
            })

        self.perform_destroy(instance)
        return Response({
            'id': id,
            'message': 'Group was deleted!'
        })

    def perform_destroy(self, instance):
        instance.delete()
