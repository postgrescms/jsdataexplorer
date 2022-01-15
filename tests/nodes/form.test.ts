import { FormInputFieldNode, FormNode } from "../../src/nodes/form";
import {
  FormStringFieldViewModel,
  FormViewModel
} from "../../src/viewmodels/form";
test("Form field HTML test", () => {
  var fieldViewModel = new FormStringFieldViewModel({
    name: "f1",
    title: "field_1"
  });

  var field: FormInputFieldNode = new FormInputFieldNode(fieldViewModel);
  expect(field.element()).toMatchSnapshot();
  fieldViewModel.setText("t1");
  expect(field.element()).toMatchSnapshot();
  expect(field.element().querySelector("input").value).toEqual("t1");
});

test("Form HTML test", () => {
  var formViewModel = new FormViewModel([
    {
      name: "f1",
      title: "field_1"
    },
    {
      name: "f2",
      title: "field_2"
    },
    {
      name: "f3",
      title: "field_3"
    }
  ]);

  formViewModel.getDataCallback = (ready) => {
    ready([{ f1: 1, f2: "one", f3: "first" }]);
  };
  var form: FormNode = new FormNode(formViewModel);
  expect(form.element()).toMatchSnapshot();
  expect(
    Array.from(form.element().querySelectorAll("input")).map((i) => i.value)
  ).toEqual(["1", "one", "first"]);
});
