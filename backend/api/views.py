from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics, status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Movement
from .serializers import MovementSerializer


#TODO: cleanup unused views
class MovementView(generics.ListAPIView):
    # admin create new Movement
    queryset = Movement.objects.all()
    serializer_class = MovementSerializer
class MovementListAPI(generics.ListCreateAPIView):
    queryset = Movement.objects.all()
    serializer_class = MovementSerializer

class MovementList(viewsets.ViewSet):
    
    def list(self):
        movements = Movement.objects.all()
        serializer = MovementSerializer(movements)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class MovementViewSet(viewsets.ViewSet):

    def list(self, request):
        try:
            movements = Movement.objects.all()
            serializer = MovementSerializer(movements, many=True)
            return Response(serializer.data, status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {
                    "message": f"Error retrieving list.",
                    "details": str(e),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

    def get_entity(self, id):
        try:
            movement = Movement.objects.get(id=id)
            return movement
        except Movement.DoesNotExist:
            raise Movement.DoesNotExist(f"Movement with id {id} does not exist.")

    def create(self, request):
        print('request', request.data.items())
        serializer = MovementSerializer(data=request.data)
        if serializer.is_valid():
            print('isvalid!!!')
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            {
                "message": "Error creating movement.",
                "details": serializer.errors,
            },
            status.HTTP_400_BAD_REQUEST,
        )
    
    def retrieve(self, request, pk):
        try:
            movement = self.get_entity(pk)
            serializer = MovementSerializer(movement)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Movement.DoesNotExist as e:
            return Response(
                {
                    "message": str(e),
                },
                status=status.HTTP_404_NOT_FOUND,
            )

    def update(self, request, pk):
        try:
            movement = self.get_entity(pk)
            data = request.data
            serializer = MovementSerializer(movement, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Movement.DoesNotExist as e:
            return Response(
                {
                    "message": str(e),
                },
                status=status.HTTP_404_NOT_FOUND,
            )

    def destroy(self, request, pk):
        try:
            movement = self.get_entity(pk)
            movement.delete()
            return Response({"message": f"Deleted movement {pk}"}, status=status.HTTP_204_NO_CONTENT)
        except Movement.DoesNotExist as e:
            return Response(
                {
                    "message": str(e),
                },
                status=status.HTTP_404_NOT_FOUND,
            )


@api_view(['GET'])
def search(request):
    """
    Frontend passes params as follows: `search/?name=string+string&version=string`
    Where at least one parameter is required
    """
    name = request.GET.get('name', None)
    version = request.GET.get('version', None)

    queryset = None

    try:
        if name != None:
            queryset = Movement.objects.filter(name__icontains=name)
        if version != None:
            queryset = queryset.filter(versions__icontains=version) if queryset != None else Movement.objects.filter(versions__icontains=version)
    except Exception as e:
        return Response({"message": f"Error retrieving result",  "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if queryset:
        serializer = MovementSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({"message": "your search yielded no result"}, status=status.HTTP_204_NO_CONTENT)


# class MovementDetail(generics.RetrieveDestroyAPIView):
#     queryset = Movement.objects.all()
#     serializer_class = MovementSerializer

#     pass
