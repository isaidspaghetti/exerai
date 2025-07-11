// To populate the exercise options in the create/update modals
// Normally this would be done with an api call

const rawPythonDump = [
  {
    model: 'api.exercise',
    pk: 6,
    fields: { name: 'External Shoulder Rotation - Side Lying' },
  },
  {
    model: 'api.exercise',
    pk: 8,
    fields: { name: 'External Rotation - Side-Lying' },
  },
  {
    model: 'api.exercise',
    pk: 12,
    fields: {
      name: 'External Shoulder Rotation with Abduction Stretch - Supine',
    },
  },
  { model: 'api.exercise', pk: 23, fields: { name: 'Supine Punch' } },
  {
    model: 'api.exercise',
    pk: 25,
    fields: { name: 'Internal Shoulder Rotation' },
  },
  { model: 'api.exercise', pk: 36, fields: { name: 'Row - Prone' } },
  {
    model: 'api.exercise',
    pk: 37,
    fields: { name: 'Shoulder Flexion - Supine - ROM' },
  },
  { model: 'api.exercise', pk: 41, fields: { name: 'Push-Ups' } },
  { model: 'api.exercise', pk: 53, fields: { name: 'Diagonal Up' } },
  { model: 'api.exercise', pk: 90, fields: { name: 'Shoulder Flexion' } },
  {
    model: 'api.exercise',
    pk: 92,
    fields: { name: 'Shoulder Flexion to 90º - Supine' },
  },
  {
    model: 'api.exercise',
    pk: 102,
    fields: { name: 'Shoulder Extension - Prone' },
  },
  { model: 'api.exercise', pk: 105, fields: { name: 'Dynamic Hug' } },
  { model: 'api.exercise', pk: 107, fields: { name: 'Standing T' } },
  {
    model: 'api.exercise',
    pk: 114,
    fields: { name: 'Shoulder Flexion AAROM - Supine' },
  },
  {
    model: 'api.exercise',
    pk: 117,
    fields: { name: 'External Shoulder Rotation' },
  },
  { model: 'api.exercise', pk: 118, fields: { name: 'Wall Climb' } },
  {
    model: 'api.exercise',
    pk: 120,
    fields: { name: 'PNF - D1 Diagonal Lifts' },
  },
  { model: 'api.exercise', pk: 129, fields: { name: 'Push-Ups on Knees' } },
  {
    model: 'api.exercise',
    pk: 132,
    fields: { name: 'Internal Shoulder Abduction/Rotation at 90° - ROM' },
  },
  {
    model: 'api.exercise',
    pk: 133,
    fields: { name: 'External Shoulder Abduction/Rotation at 90° - ROM' },
  },
  {
    model: 'api.exercise',
    pk: 134,
    fields: { name: 'External Shoulder Abduction/Rotation at 0° - ROM' },
  },
  {
    model: 'api.exercise',
    pk: 135,
    fields: { name: 'Shoulder Flexion - ROM' },
  },
  {
    model: 'api.exercise',
    pk: 136,
    fields: { name: 'Shoulder Extension - Prone - ROM' },
  },
  {
    model: 'api.exercise',
    pk: 137,
    fields: { name: 'Shoulder Extension - ROM' },
  },
  {
    model: 'api.exercise',
    pk: 140,
    fields: { name: 'External Shoulder Rotation Stretch - Supine' },
  },
  {
    model: 'api.exercise',
    pk: 141,
    fields: { name: 'Cross Chest Stretch - Supine' },
  },
  {
    model: 'api.exercise',
    pk: 142,
    fields: { name: 'Internal Shoulder Rotation Stretch - Sidelying' },
  },
  {
    model: 'api.exercise',
    pk: 149,
    fields: { name: 'External Rotation Stretch' },
  },
  { model: 'api.exercise', pk: 152, fields: { name: 'Standing Y' } },
  { model: 'api.exercise', pk: 153, fields: { name: 'Standing I' } },
  { model: 'api.exercise', pk: 154, fields: { name: 'Tricep Extension' } },
  { model: 'api.exercise', pk: 160, fields: { name: 'Row - Seated' } },
  { model: 'api.exercise', pk: 164, fields: { name: 'Shoulder Wall Slides' } },
  { model: 'api.exercise', pk: 165, fields: { name: 'Row - Standing' } },
  {
    model: 'api.exercise',
    pk: 166,
    fields: { name: 'Straight Leg Raise (SLR) - Supine' },
  },
  {
    model: 'api.exercise',
    pk: 167,
    fields: { name: 'Terminal Knee Extension - Supine' },
  },
  { model: 'api.exercise', pk: 168, fields: { name: 'Heel Slides - Supine' } },
  {
    model: 'api.exercise',
    pk: 169,
    fields: { name: 'Clamshell with Pillow - Side Lying' },
  },
  { model: 'api.exercise', pk: 175, fields: { name: 'Squat' } },
  { model: 'api.exercise', pk: 177, fields: { name: 'Squat (Prisoner)' } },
  { model: 'api.exercise', pk: 178, fields: { name: 'Bridge' } },
  {
    model: 'api.exercise',
    pk: 179,
    fields: { name: 'Hip Flexion to 90º - Standing' },
  },
  { model: 'api.exercise', pk: 180, fields: { name: 'Knee Flexion - Prone' } },
];
const exercises = rawPythonDump.map((item) => ({
  value: item.pk,
  label: item.fields.name,
}));
export { exercises };
