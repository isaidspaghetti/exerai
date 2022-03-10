# Script to load raw json and convert it to a python fixture format
import argparse
import json
import sys


# Parse inputs
def init_argparse() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        usage="%(prog)s [INPUT FILE PATH] [FIXTURE NAME]",
        description="Create a fixture file from a json file."
    )
    parser.add_argument(
        "input_path",
        metavar="input path",
        help="Relative path to the JSON input file."
    )
    parser.add_argument(
        "fixture_name",
        metavar="fixture name",
        help="Name of the fixture file to create (do not include extension)",
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
            fixture_data = []
            for movement in dict_list:
                fixture_data.append({
                    "model": "api.Movements",
                    "pk": movement.pop("id"),
                    "fields": movement
                })

            # Create the fixture file
            with open(f"api/fixtures/{args.fixture_name}.json", "w") as fixture_file:
                json.dump(fixture_data, fixture_file, indent=4)

    except Exception as e:
        print('Failed: ', e)
        sys.exit(1)


if __name__ == "__main__":
    main()
