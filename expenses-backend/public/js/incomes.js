function logout() {
  localStorage.jwt = "";
  location.reload();
}

function openIncomeModal(incomeId) {
  getSingleIncome(incomeId);
}

function openIncomeCreateModal() {
  $("#income-modal-title").text("Create income");
  document.getElementById("income-modal-data").innerHTML = `
    <div class="modal-body">
        <div class="col-lg-12">

            <div class="row g-3">
                <div class="col-sm-12">
                    <label class="form-label">Expese name</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                        <input  type="text" class="form-control" id="income-name">
                    </div>
                </div>
                <div class="col-sm-12">
                    <label class="form-label">income sum</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                        <input  type="text" class="form-control" id="income-sum">
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="form-label">income description</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
                        <textarea type="text" row="3" class="form-control" id="income-description"></textarea>
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="form-label">income type</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
                        <select class="form-select" id="income-type">
                            <option value="one-time">One-time</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                </div>

                <p id="statement"></p>
            </div>
        </div>
    </div>
    <div class='modal-footer'>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="createIncome()">Create income</button>
    </div>
    `;
  $("#income-modal").modal("show");
}

const baseUrl = "http://localhost:5000/api/v1";

async function getAllIncomes() {
  await axios
    .get(`${baseUrl}/incomes`, {
      headers: { Authorization: `Bearer ${localStorage.jwt}` },
    })
    .then(
      (res) => {
        document.getElementById("incomes-table-body").innerHTML = "";
        res.data.incomes.map((income) => {
          document.getElementById("incomes-table-body").innerHTML += `
                <tr ondblclick="openIncomeModal('${income._id}')">
                    <td>${income.createdAt}</td>
                    <td>${income.name}</td>
                    <td>${income.type}</td>
                    <td>${income.sum}</td>
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

function getSingleIncome(incomeId) {
  axios
    .get(`${baseUrl}/incomes/${incomeId}`, {
      headers: { Authorization: `Bearer ${localStorage.jwt}` },
    })
    .then(
      (res) => {
        $("#income-modal-title").text("Edit income");
        document.getElementById("income-modal-data").innerHTML = `
            <div class="modal-body">
                <div class="col-lg-12">

                    <div class="row g-3">
                        <div class="col-sm-6">
                            <label class="form-label">Expese name</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                                <input disabled value="${res.data.income.createdAt}" type="text" class="form-control" id="income-date">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label class="form-label">Expese name</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                                <input value="${res.data.income.name}" type="text" class="form-control" id="income-name">
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <label class="form-label">income sum</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                                <input value="${res.data.income.sum}" type="text" class="form-control" id="income-sum">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label class="form-label">income description</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
                                <textarea type="text" row="3" class="form-control" id="income-description">${res.data.income.description}</textarea>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label class="form-label">income type</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
                                <select class="form-select" id="income-type">
                                    <option style="background:green; color:white" value="one-time" selected>${res.data.income.type}</option>
                                    <option value="one-time">One-time</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                        </div>

                        <p id="statement"></p>
                    </div>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-danger" onclick="deleteIncome('${res.data.income._id}')">Delete</button>
                <button type="button" class="btn btn-success" onclick="editIncome('${res.data.income._id}')">Edit income</button>
            </div>
            `;
        $("#income-modal").modal("show");
      },
      (error) => {
        console.log(error);
      }
    );
}

function editIncome(incomeId) {
  const incomeData = JSON.stringify({
    name: $("#income-name").val(),
    sum: $("#income-sum").val(),
    description: $("#income-description").val(),
    type: $("#income-type").val(),
  });

  axios
    .patch(`${baseUrl}/incomes/${incomeId}`, incomeData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.jwt}`,
      },
    })
    .then(
      (res) => {
        getAllIncomes();
      },
      (error) => {
        console.log(error);
      }
    );
}

function createIncome() {
  const incomeData = JSON.stringify({
    name: $("#income-name").val(),
    sum: $("#income-sum").val(),
    description: $("#income-description").val(),
    createdBy: localStorage.userId,
    type: $("#income-type").val(),
  });
  console.log(incomeData);

  axios
    .post(`${baseUrl}/incomes`, incomeData, {
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

function deleteIncome(incomeId) {
  if (confirm("Are you sure you want to delete this income?")) {
    axios
      .delete(`${baseUrl}/incomes/${incomeId}`, {
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
