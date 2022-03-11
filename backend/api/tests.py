from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from api.models import Movement


class Test_Create_Movement(TestCase):

    @classmethod
    def setUpTestData(cls):
        testuser1 = User.objects.create_user(
            username='test_user1', password='123456789'
        )
        test_exercise = JSONField('{"id": 120, "name": "PNF - D1 Diagonal Lifts"}')
        test_movement = Movement.objects.create(
            actionDescription="\u2022 Begin the movement by raising the involved arm up and across the body.\n\u2022 Move the hand and theraband up towards the opposite shoulder in a diagonal motion. \n\u2022 Hold at the top for a moment then return to the starting position and repeat.",
            exerId='S-TS-999', 
            exercise='{"id": 120, "name": "PNF - D1 Diagonal Lifts"}',
            name= "D1 - Diagonal Lifts", 
            thumbnailUrl= "https://tryout-data.s3.amazonaws.com/thumbnails/75365d3f-f38e-4e08-9ca4-e98866a851c7.jpeg",
            versions= ["1.5.0", "1.6.0",]
        )


    def test_movement_content(self):
        movement = Movement.objects.get(id=1)
        actionDescription = f"{movement.actionDescription}"
        exerId = f'{movement.exerId}'
        exercise = f'{movement.exercise}'
        name = f'{movement.name}'
        thumbnailUrl = f'{movement.thumbnailUrl}'
        versions = f'{movement.versions}'

        self.assertEqual(actionDescription, "\u2022 Begin the movement by raising the involved arm up and across the body.\n\u2022 Move the hand and theraband up towards the opposite shoulder in a diagonal motion. \n\u2022 Hold at the top for a moment then return to the starting position and repeat.")
        self.assertEqual(exerId, 'S-TS-999')
        self.assertEqual(exercise, '{"id": 120, "name": "PNF - D1 Diagonal Lifts"}')
        self.assertEqual(name, "D1 - Diagonal Lifts")
        self.assertEqual(thumbnailUrl, "https://tryout-data.s3.amazonaws.com/thumbnails/75365d3f-f38e-4e08-9ca4-e98866a851c7.jpeg") 
        self.assertEqual(versions, "['1.5.0', '1.6.0']")


class MovementTests(APITestCase):
    def test_non_admin_user(self):
        url = reverse('movements_list')
        print("url", url)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


