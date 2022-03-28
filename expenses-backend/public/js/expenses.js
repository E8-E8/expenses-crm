function logout() {
  localStorage.jwt = "";
  location.reload();
}

function openExpenseModal(expenseId) {
  getSingleExpense(expenseId);
}

function openExpenseCreateModal() {
  $("#expense-modal-title").text("Create expense");
  document.getElementById("expense-modal-data").innerHTML = `
    <div class="modal-body">
        <div class="col-lg-12">

            <div class="row g-3">
                <div class="col-sm-12">
                    <label class="form-label">Expese name</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                        <input  type="text" class="form-control" id="expense-name">
                    </div>
                </div>
                <div class="col-sm-12">
                    <label class="form-label">Expense sum</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                        <input  type="text" class="form-control" id="expense-sum">
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="form-label">Expense description</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
                        <textarea type="text" row="3" class="form-control" id="expense-description"></textarea>
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="form-label">Expense type</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
                        <select class="form-select" id="expense-type">
                            <option value="one-time">One-time</option>
                            <option value="monthly">Monthly</option>
                            <option value="annual">Annual</option>
                        </select>
                    </div>
                </div>

                <p id="statement"></p>
            </div>
        </div>
    </div>
    <div class='modal-footer'>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="createExpense()">Create expense</button>
    </div>
    `;
  $("#expense-modal").modal("show");
}

const baseUrl = "http://localhost:5000/api/v1";

async function getAllExpenses() {
  await axios
    .get(`${baseUrl}/expenses`, {
      headers: { Authorization: `Bearer ${localStorage.jwt}` },
    })
    .then(
      (res) => {
        document.getElementById("expenses-table-body").innerHTML = "";
        res.data.expenses.map((expense) => {
          document.getElementById("expenses-table-body").innerHTML += `
                <tr ondblclick="openExpenseModal('${expense._id}')">
                    <td>${expense.createdAt}</td>
                    <td>${expense.name}</td>
                    <td>${expense.type}</td>
                    <td>${expense.sum}</td>
                </tr>
                `;
        });
      },
      (error) => {
        if (error.response.status === 401) {
          location.replace("../index.html");
        } else {
          return error;
        }
      }
    );
}

function getSingleExpense(expenseId) {
  axios
    .get(`${baseUrl}/expenses/${expenseId}`, {
      headers: { Authorization: `Bearer ${localStorage.jwt}` },
    })
    .then(
      (res) => {
        $("#expense-modal-title").text("Edit expense");
        document.getElementById("expense-modal-data").innerHTML = `
            <div class="modal-body">
                <div class="col-lg-12">

                    <div class="row g-3">
                        <div class="col-sm-6">
                            <label class="form-label">Expese name</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                                <input disabled value="${res.data.expense.createdAt}" type="text" class="form-control" id="expense-date">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label class="form-label">Expese name</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                                <input value="${res.data.expense.name}" type="text" class="form-control" id="expense-name">
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <label class="form-label">Expense sum</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                                <input value="${res.data.expense.sum}" type="text" class="form-control" id="expense-sum">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label class="form-label">Expense description</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
                                <textarea type="text" row="3" class="form-control" id="expense-description">${res.data.expense.description}</textarea>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label class="form-label">Expense type</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
                                <select class="form-select" id="expense-type">
                                    <option value="one-time" style="background:green; color:white;" selected>${res.data.expense.type}</option>
                                    <option value="one-time">One-time</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="annual">Annual</option>
                                </select>
                            </div>
                        </div>

                        <p id="statement"></p>
                    </div>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-danger" onclick="deleteExpense('${res.data.expense._id}')">Delete</button>
                <button type="button" class="btn btn-success" onclick="editExpense('${res.data.expense._id}')">Edit expense</button>
            </div>
            `;
        $("#expense-modal").modal("show");
      },
      (error) => {
        console.log(error);
      }
    );
}

function editExpense(expenseId) {
  const expenseData = JSON.stringify({
    name: $("#expense-name").val(),
    sum: $("#expense-sum").val(),
    description: $("#expense-description").val(),
    type: $("#expense-type").val(),
  });

  axios
    .patch(`${baseUrl}/expenses/${expenseId}`, expenseData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.jwt}`,
      },
    })
    .then(
      (res) => {
        getAllExpenses();
      },
      (error) => {
        console.log(error);
      }
    );
}

function createExpense() {
  console.log(localStorage.userId);
  const expenseData = JSON.stringify({
    name: $("#expense-name").val(),
    sum: $("#expense-sum").val(),
    description: $("#expense-description").val(),
    createdBy: localStorage.userId,
    type: $("#expense-type").val(),
  });
  axios
    .post(`${baseUrl}/expenses`, expenseData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.jwt}`,
      },
    })
    .then(
      (res) => {
        location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
}

function deleteExpense(expenseId) {
  if (confirm("Are you sure you want to delete this expense?")) {
    axios
      .delete(`${baseUrl}/expenses/${expenseId}`, {
        headers: { Authorization: `Bearer ${localStorage.jwt}` },
      })
      .then(
        (res) => {
          location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
