from rest_framework import serializers
from backend.models import UserModel, Group


# 	Dynamically modifying fields
class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class GroupSerializer(DynamicFieldsModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Group
        fields = '__all__'


class UserSerializer(DynamicFieldsModelSerializer):
    group = GroupSerializer(fields=('id', 'name'), required=False, read_only=True)
    group_id = serializers.IntegerField(write_only=True, required=False)
    owner = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = UserModel
        fields = '__all__'

    def create(self, validated_data):
        group = Group.objects.get(pk=validated_data.pop('group_id'))

        data = {
            **validated_data,
            'group': group
        }
        instance = UserModel.objects.create(**data)

        return instance
