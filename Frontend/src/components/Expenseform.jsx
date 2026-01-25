import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Baseapi } from "../confic";

function Expenseform({ setIsSubmit, isSubmit }) {
  // 1️⃣ Initial values (Formik replaces useState)
  const initialValues = {
    name: "",
    description: "",
    category: "",
    date: "",
    image: null,
  };

  // 2️⃣ Yup validation schema (frontend validation)
  const expenseSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    date: Yup.string().required("Date is required"),
    image: Yup.mixed().required("Bill image is required"),
  });

  // 3️⃣ Form submit (API + backend response)
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      const response = await Baseapi.post("/createexpense", formData);

      toast.success(response.data.message);
      resetForm();
      setIsSubmit(!isSubmit);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Add Expense</h3>

            {/* 4️⃣ Formik Wrapper */}
            <Formik
              initialValues={initialValues}
              validationSchema={expenseSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form>
                  {/* Name */}
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <Field name="name" className="form-control" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <label className="form-label">Expense Description</label>
                    <Field
                      as="textarea"
                      name="description"
                      className="form-control"
                      rows="3"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  {/* Category */}
                  <div className="mb-3">
                    <label className="form-label">Expense Category</label>
                    <Field
                      as="select"
                      name="category"
                      className="form-select"
                    >
                      <option value="">Select Category</option>
                      <option value="Food">Food</option>
                      <option value="Travel">Travel</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Bills">Bills</option>
                      <option value="Other">Other</option>
                    </Field>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  {/* Date */}
                  <div className="mb-3">
                    <label className="form-label">Date of Expense</label>
                    <Field
                      type="date"
                      name="date"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="mb-3">
                    <label className="form-label">Bills</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) =>
                        setFieldValue("image", e.target.files[0])
                      }
                    />
                    <ErrorMessage
                      name="image"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  {/* Submit */}
                  <button type="submit" className="btn btn-primary w-100">
                    Submit Expense
                  </button>
                </Form>
              )}
            </Formik>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Expenseform;
