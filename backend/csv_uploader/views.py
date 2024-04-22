from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import MappedData
from .utils import validate_file, process_csv_data

# Create your views here.

@api_view(['POST'])
def upload_csv(request):
    uploaded_file = request.FILES.get('file', None)
    error_message, status = validate_file(uploaded_file)
    if error_message:
        return Response({'error': error_message}, status=status)

    try:
        objects_to_create = process_csv_data(uploaded_file)
        print("Result output", objects_to_create)

        for obj in objects_to_create:
            MappedData.objects.create(
                name=obj['name'], class_field=obj['class'], school=obj['school'], state=obj['state'])

        return Response({'message': 'CSV file uploaded and processed successfully', 'result': objects_to_create})
    except Exception as e:
        return Response({'error': str(e)}, status=500)
