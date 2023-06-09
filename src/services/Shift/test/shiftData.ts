export const shiftData = [
  {
    _id: '64225a94447d020e297715e2',
    employeeId: 'd2d877bb-1b3d-4ec7-ad46-1c1b131b0cb2',
    vehicles: [],
    location: {
      type: "Point",
      coordinates: [-74.005974, 40.712776]
    },
    start_time: new Date().toISOString(),
    end_time: new Date(new Date().setHours(new Date().getHours() + 2)).toISOString(),
  },
  {
    _id: '64225a94447d020e297715e3',
    employeeId: '24dca34c-815f-4d06-aecf-c6a413bba0dc',
    vehicles: [],
    location: {
      type: 'Point',
      coordinates: [-74.712776, 40.712776],
    },
    start_time: new Date().toISOString(),
    end_time: new Date(new Date().setHours(new Date().getHours() + 3)).toISOString(),
  },
  {
    _id: '64225a94447d020e297715e4',
    employeeId: '1a1102c1-58d9-412c-8aee-b04273ae1fd7',
    vehicles: [],
    location: {
      type: 'Point',
      coordinates: [-74.712776, 40.712776],
    },
    start_time: new Date().toISOString(),
    end_time: new Date(new Date().setHours(new Date().getHours() + 4)).toISOString(),
  },
  {
    _id: '6422a70622c0796f77a3983c',
    employeeId: '24dca34c-815f-4d06-aecf-c6a413bba0dc',
    vehicles: ['6422a72e74228ccb9d7ae092'],
    location: {
      type: 'Point',
      coordinates: [-74.712776, 40.712776],
    },
    start_time: new Date(new Date().setHours(new Date().getHours() - 3)).toISOString(),
    end_time: new Date(new Date().setHours(new Date().getHours() + 3)).toISOString(),
  },
  {
    _id: '6422a95033457486396de1b9',
    employeeId: '24dca34c-815f-4d06-aecf-c6a413bba0dc',
    vehicles: ['6422a8b53d094083edda3480', '6422a8ebf6b65eb304d268c9'],
    location: {
      type: 'Point',
      coordinates: [-74.712776, 40.712776],
    },
    start_time: new Date(new Date().setHours(new Date().getHours() - 3)).toISOString(),
    end_time: new Date(new Date().setHours(new Date().getHours() + 3)).toISOString(),
  },
  {
    _id: '6422adde6923ab73e768fed5',
    employeeId: '24dca34c-815f-4d06-aecf-c6a413bba0dc',
    vehicles: ['6422a8b53d094083edda3480', '6422a8ebf6b65eb304d268c9', '6422a72e74228ccb9d7ae092'],
    location: {
      type: 'Point',
      coordinates: [-74.712776, 40.712776],
    },
    start_time: new Date(new Date().setHours(new Date().getHours() - 3)).toISOString(),
    end_time: new Date(new Date().setHours(new Date().getHours() + 3)).toISOString(),
  },
  {
    _id: '6422ae558d85cfce53e8738e',
    employeeId: '24dca34c-815f-4d06-aecf-c6a413bba0dc',
    vehicles: ['6422a72e74228ccb9d7ae092', '6422a75cd7e61c744bad58ee'],
    location: {
      type: 'Point',
      coordinates: [-74.712776, 40.712776],
    },
    start_time: new Date(new Date().setHours(new Date().getHours() - 3)).toISOString(),
    end_time: new Date(new Date().setHours(new Date().getHours() + 3)).toISOString(),
  },
];
