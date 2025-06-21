import json

PEXELS_IMAGE_MAP_PATH = "pexels_exercise_images.json"
MOVEMENTS_PATH = "api/fixtures/movements.json"

def main():
    with open(PEXELS_IMAGE_MAP_PATH, "r") as f:
        exercise_image_map = json.load(f)
    with open(MOVEMENTS_PATH, "r") as f:
        movements = json.load(f)

    updated = 0
    for m in movements:
        name = m["fields"].get("name")
        if name in exercise_image_map:
            old_url = m["fields"].get("thumbnailUrl", "")
            new_url = exercise_image_map[name]
            if old_url != new_url:
                m["fields"]["thumbnailUrl"] = new_url
                updated += 1
                print(f"Updated '{name}': {old_url} -> {new_url}")

    with open(MOVEMENTS_PATH, "w") as f:
        json.dump(movements, f, indent=4)
    print(f"\nUpdated {updated} movement images.")

if __name__ == "__main__":
    main() 