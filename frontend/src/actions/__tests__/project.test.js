import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import camelcaseKeys from "camelcase-keys";
import { fetchProjects } from "../project";
import * as types from "../../constants/ActionTypes";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const serverResponse = {
  limit: 2,
  total_count: 1864,
  page_count: 2,
  start: 1800,
  links: {
    base: "http://localhost:8080/api/v1/projects",
    context: "",
    next: "http://localhost:8080/api/v1/projects?skip=1802&limit=2",
    current: "http://localhost:8080/api/v1/projects?skip=1800&limit=2",
  },
  results: [
    {
      name: "project0",
      display_name: "Project 0",
      short_description:
        "Quiquia dolorem magnam quaerat porro modi ipsum. Quaerat sed labore dolore dolorem non quisquam. Quaerat tempora neque eius velit velit numquam modi. Consectetur amet consectetur modi numquam.",
      long_description:
        "Dolorem tempora numquam ut sit dolore modi. Dolorem labore aliquam aliquam sit magnam numquam. Aliquam porro ipsum consectetur tempora etincidunt sit. Dolore numquam etincidunt adipisci. Porro numquam consectetur dolorem. Aliquam sit dolorem dolore adipisci voluptatem sed magnam. Ut dolore sit dolor non sed eius. Quaerat amet quiquia adipisci labore. Est eius neque dolore. Quaerat ipsum neque dolor tempora neque. Consectetur labore quisquam voluptatem quaerat. Consectetur numquam etincidunt ipsum tempora dolore dolor. Adipisci etincidunt modi sit numquam sed aliquam. Voluptatem porro quaerat est magnam voluptatem. Labore porro quaerat dolore. Sed dolor ut dolore velit tempora adipisci sed. Voluptatem dolor etincidunt ut. Adipisci velit sed neque quaerat. Tempora adipisci voluptatem dolore dolorem. Etincidunt quisquam voluptatem magnam quisquam labore. Eius sit dolore dolor dolore dolorem adipisci adipisci. Quisquam quaerat magnam neque porro porro. Porro quisquam non etincidunt. Sed quisquam porro ut magnam. Ipsum non voluptatem porro ipsum quiquia.",
    },
    {
      name: "project1",
      display_name: "Project 1",
      short_description:
        "Ut non ut magnam tempora. Ipsum est dolor magnam aliquam quiquia. Etincidunt magnam numquam dolor sit magnam.",
      long_description:
        "Ut neque adipisci sit magnam. Porro eius aliquam labore dolorem labore amet. Tempora etincidunt amet consectetur. Amet etincidunt etincidunt quiquia sed velit non velit. Neque adipisci porro etincidunt non. Aliquam tempora consectetur ipsum sed dolore tempora. Est ut tempora consectetur. Dolor eius tempora etincidunt. Dolorem magnam aliquam non voluptatem tempora. Labore aliquam quisquam porro etincidunt sed eius magnam. Neque dolorem amet adipisci dolorem quaerat ipsum. Amet amet dolore dolore voluptatem sed. Quisquam voluptatem dolore sit numquam dolorem numquam. Consectetur quisquam etincidunt velit neque sed tempora quiquia. Porro consectetur voluptatem sit etincidunt adipisci sed. Tempora sed tempora labore dolorem dolor etincidunt sit. Aliquam ut voluptatem modi non sit sed voluptatem. Amet non amet voluptatem labore. Amet sed ipsum tempora porro. Ut quiquia dolore neque quisquam quisquam quaerat. Sit dolore dolore sed est quiquia eius etincidunt. Ut neque sit adipisci neque quiquia numquam. Tempora est labore numquam quaerat voluptatem eius adipisci. Neque etincidunt magnam est dolor consectetur. Dolore est ipsum labore. Sit numquam sed porro eius non. Adipisci adipisci quiquia ipsum modi neque ut.",
    },
  ],
};
const fetchMock = new MockAdapter(axios);

const setup = (
  initialState,
  serverError = false,
  networkError = false,
  status = 500,
) => {
  Object.assign({}, initialState);
  const url = "/api/v1/projects";
  if (networkError) {
    fetchMock.onGet(url).networkError();
  } else if (serverError) {
    fetchMock.onGet(url).reply(status, { message: "Error from server" });
  } else {
    fetchMock.onGet(url).reply(200, serverResponse);
  }

  const store = mockStore(initialState);
  return {
    store,
  };
};

describe("project actions", () => {
  afterEach(() => {
    fetchMock.reset();
  });

  test("it creates FETCH_PROJECTS_SUCCESS when fetching projects is done", () => {
    const { store } = setup();

    const expectedResponse = camelcaseKeys(serverResponse["results"]);

    const expectedActions = [
      { type: types.FETCH_PROJECTS_BEGIN },
      {
        type: types.FETCH_PROJECTS_SUCCESS,
        payload: { projects: expectedResponse },
      },
    ];
    return store.dispatch(fetchProjects()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test("it should create a failed action if the fetch fails", () => {
    const { store } = setup({}, true, false);
    const expectedActions = [
      { type: types.FETCH_PROJECTS_BEGIN },
      {
        type: types.FETCH_PROJECTS_FAILURE,
        payload: { error: Error("Error from server") },
      },
    ];
    return store.dispatch(fetchProjects()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
