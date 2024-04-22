import io
import pandas as pd

def validate_file(uploaded_file):
    if not uploaded_file:
        return 'No file inputted', 400
    if uploaded_file.content_type != 'text/csv':
        return 'Only CSV files are allowed', 400
    if uploaded_file.size == 0:
        return 'Uploaded file is empty', 400

    return None, None


def map_location_to_state(city):
    state_map = {
        'Boston': 'MA',
        'Palo Alto': 'CA',
        'New York': 'NY',
    }
    return state_map.get(city, 'Unknown')


def process_csv_data(uploaded_file):
    decoded_file = uploaded_file.read().decode('utf-8')
    io_string = io.StringIO(decoded_file)
    df = pd.read_csv(io_string)
    dic_data = df.to_dict(orient='records')

    num_columns = df.shape[1]
    result_data = []

    for row in dic_data:
        classes = [row.get(f'Class {i}', '') for i in range(
            1, num_columns) if row.get(f'Class {i}', None) is not None]
        # Default to original if no mapping found
        state_abbreviation = map_location_to_state(row['Location'])

        # Create MappedData object
        for class_name in classes:
            fullName = f"{row['First Name']} {row['Last Name']}"
            result_data.append({
                'name': fullName,
                'class': class_name,
                'school': row['School'],
                'state': state_abbreviation
            })
    return result_data
