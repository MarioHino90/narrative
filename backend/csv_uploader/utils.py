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