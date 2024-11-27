from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserSerializer, ResourceSerializer, UserProfileSerializer
from .models import Resource, UserProfile, Admin

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    user = request.user
    is_admin = Admin.objects.filter(user=user).exists()
    user_serializer = UserSerializer(user)
    user_data = user_serializer.data
    user_data['isAdmin'] = is_admin
    return Response({
        'message': 'Welcome to your dashboard',
        'user': user_data
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    view = TokenObtainPairView.as_view()
    return view(request._request)

@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_profiles(request):
    profiles = UserProfile.objects.all()
    serializer = UserProfileSerializer(profiles, many=True)
    return Response(serializer.data)

@api_view(['POST', 'PUT'])
@permission_classes([IsAuthenticated])
def detailprofile(request):
    user = request.user
    try:
        profile = UserProfile.objects.get(account=user)
    except UserProfile.DoesNotExist:
        profile = None

    if request.method == 'POST':
        if profile:
            return Response({'error': 'Profile already exists'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = UserProfileSerializer(data=request.data)
    elif request.method == 'PUT':
        serializer = UserProfileSerializer(profile, data=request.data)

    if serializer.is_valid():
        serializer.save(account=user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_specifique_resource(request):
    user = request.user
    if user.is_anonymous:
        return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)
    
    resource = Resource.objects.filter(author=user)
    serializerData = ResourceSerializer(resource, many=True).data
    return Response(serializerData)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_resources(request):
    resources = Resource.objects.all()
    serializerData = ResourceSerializer(resources, many=True).data
    return Response(serializerData)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_resource(request):
    user = request.user
    try:
        admin = Admin.objects.get(user=user)
    except Admin.DoesNotExist:
        return Response({'error': 'Only admin can add resources'}, status=status.HTTP_403_FORBIDDEN)

    serializer = ResourceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(author=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_resource(request, id):
    user = request.user
    try:
        resource = Resource.objects.get(id=id, author=user)
        resource.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Resource.DoesNotExist:
        return Response({'error': 'Resource not found or you do not have permission to delete this resource'}, status=status.HTTP_404_NOT_FOUND)
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_resource(request, id):
    user = request.user
    try:
        resource = Resource.objects.get(id=id, author=user)
    except Resource.DoesNotExist:
        return Response({'error': 'Resource not found or you do not have permission to edit this resource'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ResourceSerializer(resource, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 