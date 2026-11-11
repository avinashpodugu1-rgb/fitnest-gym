// Twist: a locker's floor must be one of these three values.
const ALLOWED_FLOORS = ['Floor 1', 'Floor 2', 'Floor 3'];

function floorMessage(floor) {
  return `Invalid floor "${floor}". Allowed values: ${ALLOWED_FLOORS.join(', ')}`;
}

// Used on add and update. Returns an error message, or null when the data is fine.
function validateLocker(body) {
  const { name, floor } = body || {};

  if (typeof name !== 'string' || name.trim() === '') {
    return 'name is required';
  }
  if (floor === undefined || floor === null || floor === '') {
    return `floor is required. Allowed values: ${ALLOWED_FLOORS.join(', ')}`;
  }
  if (!ALLOWED_FLOORS.includes(floor)) {
    return floorMessage(floor);
  }
  return null;
}

function validateMember(body) {
  const { name } = body || {};
  if (typeof name !== 'string' || name.trim() === '') {
    return 'name is required';
  }
  return null;
}

module.exports = { ALLOWED_FLOORS, floorMessage, validateLocker, validateMember };
