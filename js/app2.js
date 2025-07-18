if (window.location.pathname.includes("signup.html")) {
  const form = document.getElementById('signupForm');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const passwordError = document.getElementById('passwordError');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (password.value !== confirmPassword.value) {
      passwordError.classList.remove('d-none');
      return;
    }

    passwordError.classList.add('d-none');

    const signupName = document.getElementById('signupname').value.trim();
    const email = document.getElementById('email').value.trim();
    const userPassword = password.value;

    if (!signupName || !email || !userPassword) {
      alert("Please fill all fields.");
      return;
    }

    const user = {
      name: signupName,
      email: email,
      password: userPassword
    };
    localStorage.setItem('user', JSON.stringify(user));

    alert("Signup successful! Please login.");
    window.location.href = "index.html"; 
  });
}


if (window.location.pathname.includes("index.html")) {
  const loginForm = document.querySelector("#loginForm");
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      const savedUser = JSON.parse(localStorage.getItem('user'));

      if (savedUser && email === savedUser.email && password === savedUser.password) {
       
        localStorage.setItem('username', savedUser.name);
        window.location.href = "deshboard.html";
      } else {
        alert("Invalid email or password.");
      }
    });
  }
}


if (window.location.pathname.includes("add_task.html")) {
  const addTaskForm = document.querySelector('form');
  if (addTaskForm) {
    addTaskForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const title = document.getElementById('task-title').value.trim();
      const description = document.getElementById('description').value.trim();
      const dueDate = document.getElementById('due-date').value;
      const category = document.getElementById('category').value;

      if (!title || !description || !dueDate || !category) {
        alert("Please fill in all fields.");
        return;
      }

      const task = {
        title: title,
        description: description,
        dueDate: dueDate,
        category: category,
        status: 'Pending'
      };

      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));


      window.location.href = "deshboard.html";
    });
  }
}


if (window.location.pathname.includes("deshboard.html")) {
  const taskContainer = document.getElementById('task-container');
  const userName = document.getElementById('userName');


  const savedUserName = localStorage.getItem('username');
  if (savedUserName && userName) {
    userName.textContent = savedUserName;
  }


  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  if (taskContainer) {
    if (tasks.length === 0) {
      taskContainer.innerHTML = "<p>No tasks available.</p>";
    } else {
      tasks.forEach(task => {
        const card = document.createElement('div');
        card.className = 'col';
        card.innerHTML = `
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">${task.title}</h5>
              <p class="card-text">${task.description}</p>
              <p><i class="fa-regular fa-clock"></i> Due: ${task.dueDate}</p>
              <span class="badge bg-danger">❗ ${task.status}</span>
              <p class="mt-2"><strong>Category:</strong> ${task.category}</p>
            </div>
          </div>
        `;
        taskContainer.appendChild(card);
      });
    }
  }
}
