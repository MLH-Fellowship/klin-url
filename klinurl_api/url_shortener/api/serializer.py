from rest_framework import serializers
from url_shortener.models import Url


class UrlSerializer(serializers.Serializer):
    long_url = serializers.CharField()
    klin_url = serializers.CharField(required=False)

    class Meta:
        fields = '__all__'

    def create(self, validated_data):
        return Url.objects.create(**validated_data)