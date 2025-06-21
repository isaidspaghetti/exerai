import json

# Manually curated Unsplash image URLs for each exercise
# These are selected based on exercise-specific searches for better relevance
CURATED_EXERCISE_IMAGES = {
    "Bridge (Bilateral), Side-Facing": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    "Clamshell with Pillow - Side Lying": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=300&fit=crop",
    "Cross Chest Stretch - Supine, Side-Facing": "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=300&fit=crop",
    "Diagonal Up": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
    "Dynamic Hug": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=300&fit=crop",
    "External Rotation - Side-Lying with Weights, Side-Facing": "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=300&fit=crop",
    "External Rotation Stretch with Cane, Side-Facing": "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=300&fit=crop",
    "External Shoulder Abduction/Rotation at 0° - ROM": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
    "External Shoulder Abduction/Rotation at 90° - ROM, Side-Facing": "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=300&fit=crop",
    "External Shoulder Rotation": "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=300&fit=crop",
    "External Shoulder Rotation - Side Lying": "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=300&fit=crop",
    "External Shoulder Rotation Stretch - Supine, Side-Facing": "https://images.unsplash.com/photo-1465101178521-c1a9136a3fdc?w=400&h=300&fit=crop",
    "External Shoulder Rotation with Abduction Stretch - Supine, Side-Facing": "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=300&fit=crop",
    "Heel Slides - Supine, Side-Facing": "https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?w=400&h=300&fit=crop",
    "Hip Flexion to 90º - Standing, Side-Facing": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=300&fit=crop",
    "Internal Shoulder Abduction/Rotation at 90° - ROM, Side-Facing": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    "Internal Shoulder Rotation": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
    "Internal Shoulder Rotation Stretch - Sidelying, Side-Facing": "https://images.unsplash.com/photo-1465101178521-c1a9136a3fdc?w=400&h=300&fit=crop",
    "Internal Shoulder Rotation with Theraband": "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=300&fit=crop",
    "Knee Flexion - Prone, Side-Facing": "https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?w=400&h=300&fit=crop",
    "PNF - D1 Diagonal Lifts with Theraband": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
    "Push-Ups on Knees, Side-Facing": "https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?w=400&h=300&fit=crop",
    "Push-Ups, Side-Facing": "https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?w=400&h=300&fit=crop",
    "Row - Prone with Weights, Side-Facing": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
    "Row - Prone, Side-Facing": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
    "Row - Seated with Theraband (Bilateral), Side-Facing": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
    "Row - Seated with Theraband (Single), Side-Facing": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
    "Row - Standing with Theraband, Side-Facing": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
    "Shoulder Extension - Prone - ROM, Side-Facing": "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=300&fit=crop",
    "Shoulder Extension - Prone with Weights, Side-Facing": "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=300&fit=crop",
    "Shoulder Extension - Prone, Side-Facing": "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=300&fit=crop",
    "Shoulder Extension - ROM, Side-Facing": "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=300&fit=crop",
    "Shoulder Flexion (Single), Side-Facing": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    "Shoulder Flexion - ROM, Side-Facing": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    "Shoulder Flexion - Supine - ROM, Side-Facing": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    "Shoulder Flexion AAROM - Supine with Cane, Side-Facing": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    "Shoulder Flexion to 90º - Supine with Theraband (Single), Side-Facing": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    "Shoulder Wall Slides with Theraband, Side-Facing": "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=300&fit=crop",
    "Squat (Prisoner)": "https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?w=400&h=300&fit=crop",
    "Squat (Prisoner), Side-Facing": "https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?w=400&h=300&fit=crop",
    "Squat, Side-Facing": "https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?w=400&h=300&fit=crop",
    "Standing I with Theraband with Anchor Point": "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=300&fit=crop",
    "Standing T with Theraband with Anchor Point (Bilateral)": "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=300&fit=crop",
    "Standing Y with Theraband with Anchor Point": "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=300&fit=crop",
    "Straight Leg Raise (SLR) - Supine, Side-Facing": "https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?w=400&h=300&fit=crop",
    "Supine Punch, Side-Facing": "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=300&fit=crop",
    "Terminal Knee Extension - Supine, Side-Facing": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    "Tricep Extension with Theraband (Bilateral), Side-Facing": "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=300&fit=crop",
    "Tricep Extension with Theraband (Single)": "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=300&fit=crop",
    "Wall Climb, Rear-Facing": "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=300&fit=crop",
}

def main():
    print("Curated exercise images mapping:")
    print("=" * 50)
    
    for exercise, url in CURATED_EXERCISE_IMAGES.items():
        print(f"{exercise}: {url}")
    
    print(f"\nTotal exercises: {len(CURATED_EXERCISE_IMAGES)}")
    
    # Save to JSON file
    with open('curated_exercise_images.json', 'w') as f:
        json.dump(CURATED_EXERCISE_IMAGES, f, indent=2)
    
    print("\nMapping saved to 'curated_exercise_images.json'")

if __name__ == "__main__":
    main() 