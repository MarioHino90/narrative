from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import MappedData
import pandas as pd
import io

# Create your views here.


@csrf_exempt
def upload_csv(request):
    if request.method == 'POST':
        csv_file = request.FILES['file']
        decoded_file = csv_file.read().decode('utf-8')
        io_string = io.StringIO(decoded_file)
        df = pd.read_csv(io_string)
        dic_data = df.to_dict(orient='records')
        state_mapping = {
            'Boston': 'MA',
            'Palo Alto': 'CA',
        }
        num_columns = df.shape[1]
        result_data = []

        for row in dic_data:
            classes = [row.get(f'Class {i}', '') for i in range(
                1, num_columns) if row.get(f'Class {i}', None) is not None]
            # Default to original if no mapping found
            state_abbreviation = state_mapping.get(
                row['Location'], row['Location'])

            # Create MappedData object
            for class_name in classes:
                fullName = f"{row['First Name']} {row['Last Name']}"
                MappedData.objects.create(
                    name=fullName,
                    # This should be dynamic based on the input
                    class_field=class_name,
                    school=row['School'],
                    # This needs a mapping logic to convert to state abbreviations
                    state=state_abbreviation
                )
                result_data.append({
                    'name': fullName,
                    'class': class_name,
                    'school': row['School'],
                    'state': state_abbreviation
                })
        return JsonResponse({'status': 'success', 'result': result_data})
    return render(request, 'upload.html')
