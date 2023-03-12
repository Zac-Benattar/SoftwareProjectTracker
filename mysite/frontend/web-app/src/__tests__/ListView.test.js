import {render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockFetch from "./mocks/mockFetch";
import ListView from '../components/ListView.jsx';

const dummyData =[
  [
    'Research',
    'Find sources',
    new Date(2015, 2, 1),
    new Date(2015, 2, 5),
    null,
    100,
    null,
  ],
  [
    'Write',
    'Write paper',
    new Date(2015, 2, 6),
    new Date(2015, 2, 7),
    3 * 24 * 60 * 60 * 1000,
    25,
    null,
  ],
  [
    'Cite',
    'Create bibliography',
    new Date(2015, 2, 2),
    new Date(2015, 2, 5),
    1 * 24 * 60 * 60 * 1000,
    20,
    null,
  ],
  [
    'Complete',
    'Hand in paper',
    new Date(2015, 2, 8),
    new Date(2015, 2, 10),
    1 * 24 * 60 * 60 * 1000,
    20,
    null,
  ],
  [
    'Outline',
    'Outline paper',
    new Date(2015, 2, 1),
    new Date(2015, 2, 3),
    1 * 24 * 60 * 60 * 1000,
    100,
    null,
  ],
];
beforeEach(() => {
   jest.spyOn(window, "fetch").mockImplementation(mockFetch);
})

afterEach(() => {
   jest.restoreAllMocks();
});

test('renders the landing page', async () => {
   render(<ListView />);
  /* expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
   expect(await screen.findByRole("option", { name: "husky"})).toBeInTheDocument()
   expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
   expect(screen.getByRole("img")).toBeInTheDocument();*/
});

test("should be to display tasks in appropriate categories", async () => {
   render(<ListView {...dummyData}/>);

   //Simulate selecting an option and verifying its value
   const select = screen.getByTestId("task");
   expect(select).toHaveLength(5);

   //Loading state displays and gets removed once results are displayed
   await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));

})