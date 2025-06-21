import requests
import json
import time

# Pexels API configuration
PEXELS_API_KEY = "fO9LQWrQ1fXcxO5Z3uyjLZQYIzz6TRq7cJfMIXUp3bqGGtuMQ710vTLZ"
PEXELS_API_URL = "https://api.pexels.com/v1/search"

# Exercise-specific search terms for Pexels
EXERCISE_SEARCH_TERMS = {
    "Bridge (Bilateral), Side-Facing": "bridge exercise physical therapy",
    "Clamshell with Pillow - Side Lying": "clamshell exercise physical therapy",
    "Cross Chest Stretch - Supine, Side-Facing": "chest stretch physical therapy",
    "Diagonal Up": "diagonal exercise physical therapy",
    "Dynamic Hug": "dynamic hug exercise physical therapy",
    "External Rotation - Side-Lying with Weights, Side-Facing": "external rotation shoulder exercise",
    "External Rotation Stretch with Cane, Side-Facing": "shoulder stretch cane physical therapy",
    "External Shoulder Abduction/Rotation at 0° - ROM": "shoulder rotation exercise",
    "External Shoulder Abduction/Rotation at 90° - ROM, Side-Facing": "shoulder abduction exercise",
    "External Shoulder Rotation": "external shoulder rotation exercise",
    "External Shoulder Rotation - Side Lying": "side lying shoulder rotation",
    "External Shoulder Rotation Stretch - Supine, Side-Facing": "shoulder stretch supine",
    "External Shoulder Rotation with Abduction Stretch - Supine, Side-Facing": "shoulder abduction stretch",
    "Heel Slides - Supine, Side-Facing": "heel slides exercise physical therapy",
    "Hip Flexion to 90º - Standing, Side-Facing": "hip flexion exercise standing",
    "Internal Shoulder Abduction/Rotation at 90° - ROM, Side-Facing": "internal shoulder rotation",
    "Internal Shoulder Rotation": "internal shoulder rotation exercise",
    "Internal Shoulder Rotation Stretch - Sidelying, Side-Facing": "internal shoulder stretch",
    "Internal Shoulder Rotation with Theraband": "theraband shoulder rotation",
    "Knee Flexion - Prone, Side-Facing": "knee flexion exercise prone",
    "PNF - D1 Diagonal Lifts with Theraband": "PNF diagonal exercise theraband",
    "Push-Ups on Knees, Side-Facing": "push ups knees exercise",
    "Push-Ups, Side-Facing": "push ups exercise",
    "Row - Prone with Weights, Side-Facing": "row exercise prone weights",
    "Row - Prone, Side-Facing": "row exercise prone",
    "Row - Seated with Theraband (Bilateral), Side-Facing": "seated row theraband",
    "Row - Seated with Theraband (Single), Side-Facing": "seated row single arm",
    "Row - Standing with Theraband, Side-Facing": "standing row theraband",
    "Shoulder Extension - Prone - ROM, Side-Facing": "shoulder extension prone",
    "Shoulder Extension - Prone with Weights, Side-Facing": "shoulder extension weights",
    "Shoulder Extension - Prone, Side-Facing": "shoulder extension exercise",
    "Shoulder Extension - ROM, Side-Facing": "shoulder extension ROM",
    "Shoulder Flexion (Single), Side-Facing": "shoulder flexion exercise",
    "Shoulder Flexion - ROM, Side-Facing": "shoulder flexion ROM",
    "Shoulder Flexion - Supine - ROM, Side-Facing": "shoulder flexion supine",
    "Shoulder Flexion AAROM - Supine with Cane, Side-Facing": "shoulder flexion cane exercise",
    "Shoulder Flexion to 90º - Supine with Theraband (Single), Side-Facing": "shoulder flexion theraband",
    "Shoulder Wall Slides with Theraband, Side-Facing": "wall slides theraband",
    "Squat (Prisoner)": "prisoner squat exercise",
    "Squat (Prisoner), Side-Facing": "prisoner squat side view",
    "Squat, Side-Facing": "squat exercise side view",
    "Standing I with Theraband with Anchor Point": "standing I exercise theraband",
    "Standing T with Theraband with Anchor Point (Bilateral)": "standing T exercise theraband",
    "Standing Y with Theraband with Anchor Point": "standing Y exercise theraband",
    "Straight Leg Raise (SLR) - Supine, Side-Facing": "straight leg raise exercise",
    "Supine Punch, Side-Facing": "supine punch exercise",
    "Terminal Knee Extension - Supine, Side-Facing": "terminal knee extension",
    "Tricep Extension with Theraband (Bilateral), Side-Facing": "tricep extension theraband",
    "Tricep Extension with Theraband (Single)": "tricep extension single arm",
    "Wall Climb, Rear-Facing": "wall climb exercise",
}

def search_pexels(query):
    """Search Pexels for images based on query"""
    params = {
        'query': query,
        'per_page': 3,  # Get top 3 results
        'orientation': 'landscape'
    }
    
    headers = {
        'Authorization': PEXELS_API_KEY
    }
    
    try:
        response = requests.get(PEXELS_API_URL, params=params, headers=headers)
        response.raise_for_status()
        data = response.json()
        
        if data['photos']:
            # Return the first result with proper sizing
            photo = data['photos'][0]
            return f"https://images.pexels.com/photos/{photo['id']}/pexels-photo-{photo['id']}.jpeg?w=400&h=300&fit=crop"
        else:
            return None
    except Exception as e:
        print(f"Error searching for '{query}': {e}")
        return None

def main():
    print("Searching Pexels for exercise images...")
    print("Using your API key to find better exercise images!")
    print("\n" + "="*50)
    
    results = {}
    
    for exercise_name, search_term in EXERCISE_SEARCH_TERMS.items():
        print(f"Searching for: {exercise_name}")
        print(f"Search term: {search_term}")
        
        image_url = search_pexels(search_term)
        if image_url:
            results[exercise_name] = image_url
            print(f"Found: {image_url}")
        else:
            print("No image found")
        
        print("-" * 30)
        time.sleep(1)  # Rate limiting
    
    # Save results to file
    with open('pexels_exercise_images.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\nResults saved to pexels_exercise_images.json")
    print(f"Found images for {len(results)} exercises")

if __name__ == "__main__":
    main() 