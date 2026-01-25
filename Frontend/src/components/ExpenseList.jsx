import React, { useEffect, useState } from "react";
import { Baseapi } from "../confic";
import { toast } from "react-toastify";

function ExpenseList({ isSubmit }) {
  const [expenses, setExpenses] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  // edit modal
  const [showEdit, setShowEdit] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const fetchExpenses = async (page = 1) => {
    try {
      const res = await Baseapi.get(
        `/viewexpense?page=${page}&limit=${itemsPerPage}&name=${name}&description=${description}&category=${category}&date=${date}`
      );

      setExpenses(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      toast.error("Failed to load expenses");
    }
  };

  useEffect(() => {
    fetchExpenses(currentPage);
  }, [currentPage, isSubmit, name, description, category, date]);

  const handleDelete = async (id) => {
    try {
      await Baseapi.delete(`/deleteexpense/${id}`);
      toast.success("Expense deleted");
      fetchExpenses(currentPage);
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setShowEdit(true);
  };

  const handleUpdate = async () => {
    try {
      await Baseapi.put(`/edit/${selectedExpense._id}`, selectedExpense);

      toast.success("Expense updated");
      setShowEdit(false);
      fetchExpenses(currentPage);
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h4 className="text-center mb-4">Expense List</h4>
          {/* FILTER UI */}
          <div className="row mb-4 g-2">
            {/* Name Search */}
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Description Search */}
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Category Filter */}
            <div className="col-md-2">
              <select
                className="form-select"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Categories</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Date Filter */}
            <div className="col-md-2">
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Clear Button */}
            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setName("");
                  setDescription("");
                  setCategory("");
                  setDate("");
                  setCurrentPage(1);
                }}
              >
                Clear
              </button>
            </div>
          </div>

          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Date</th>
                <th>Bill</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((exp) => (
                <tr key={exp._id}>
                  <td>{exp.name}</td>
                  <td>{exp.description}</td>
                  <td>{exp.category}</td>
                  <td>{new Date(exp.date).toLocaleDateString()}</td>

                  <td className="text-center">
                    {exp.image ? (
                      <img
                        src={`http://localhost:3000/uploads/${exp.image}`}
                        alt="bill"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(exp)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(exp._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <nav className="d-flex justify-content-center mt-3">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
              </li>

              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages && "disabled"
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>

          {/* EDIT MODAL */}
          {showEdit && (
            <>
              <div className="modal-backdrop fade show"></div>
              <div className="modal show d-block">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5>Edit Expense</h5>
                      <button
                        className="btn-close"
                        onClick={() => setShowEdit(false)}
                      ></button>
                    </div>

                    <div className="modal-body">
                      <input
                        className="form-control mb-2"
                        value={selectedExpense.name}
                        onChange={(e) =>
                          setSelectedExpense({
                            ...selectedExpense,
                            name: e.target.value,
                          })
                        }
                      />
                      <input
                        className="form-control mb-2"
                        value={selectedExpense.description}
                        onChange={(e) =>
                          setSelectedExpense({
                            ...selectedExpense,
                            description: e.target.value,
                          })
                        }
                      />
                      <input
                        className="form-control"
                        value={selectedExpense.category}
                        onChange={(e) =>
                          setSelectedExpense({
                            ...selectedExpense,
                            category: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="modal-footer">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setShowEdit(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={handleUpdate}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpenseList;
