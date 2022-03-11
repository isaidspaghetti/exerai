# Script to load raw json and convert it to a python fixture format
import argparse
import json
import sys


# Parse inputs
def init_argparse() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        usage="%(prog)s [INPUT FILE PATH]",
        description="Create a fixture file from a json file."
    )
    parser.add_argument(
        "input_path",
        metavar="input path",
        help="Relative path to the JSON input file."
    )
    return parser


def main():
    parser = init_argparse()
    args = parser.parse_args()

    try:
        # Load and parse the json file
        with open(args.input_path) as json_data:
            # Assume JSON input is not JSON string:
            dict_list = json.load(json_data)
            # TODO: validate data, form errors
            # Alter the dictionary to match django fixture format
            movements = []
            exercises = []
            for movement in dict_list:
                
                exercises.append({
                    "model": "api.Exercise",
                    "pk": movement['exercise']['id'],
                    "fields": {
                        "name": movement['exercise']['name']
                    }
                })
                movements.append({
                    "model": "api.Movement", #TODO: make model name a variable
                    "pk": movement['exercise']['id'],
                    "fields": {**movement, 'exercise': movement['exercise']['id']}
                })


            # Create the fixture files
            with open(f"api/fixtures/movements.json", "w") as fixture_file:
                json.dump(movements, fixture_file, indent=4)
            with open(f"api/fixtures/exercises.json", "w") as fixture_file:
                json.dump(exercises, fixture_file, indent=4)

    except Exception as e:
        print('Failed: ', e)
        sys.exit(1)


if __name__ == "__main__":
    main()
