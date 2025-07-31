import { connectDB } from '../DB/dbconn.js';
import { Project } from '../models/projectSchema.js';
import { Task } from '../models/taskSchema.js';
import { User } from '../models/userSchema.js';
import { Comment } from '../models/commentSchema.js';

const roles = ['Software engineer', 'Data analyst', 'Site Reliability Engineer'];
const randomStatus = () => ['To Do', 'In Progress', 'Done'][Math.floor(Math.random() * 3)];

const getRandom = (arr, n) =>
  arr.sort(() => 0.5 - Math.random()).slice(0, n);

export const seed = async () => {
//   await connectDB();

  await User.deleteMany({});
  await Project.deleteMany({});
  await Task.deleteMany({});
  await Comment.deleteMany({});

  const allProjects = [];
  const allUsers = [];

  const sharedUserPool = [];

  for (let p = 1; p <= 3; p++) {
    // Create Project
    const project = await Project.create({
      name: `Project ${p}`,
      description: `Description of Project ${p}`,
      deadline: new Date(`2025-0${9 + p}-01`)
    });
    allProjects.push(project);

    // --- Create Manager (exclusive)
    const manager = await User.create({
      name: `Manager_${p}`,
      email: `manager${p}@company.com`,
      role: 'Manager',
      project: [project._id]
    });
    allUsers.push(manager);

    // --- Create 3–5 Non-manager Users
    const projectUsers = [];
    for (let u = 1; u <= 4; u++) {
      let name = `User${p}_${u}`;
      let role = roles[Math.floor(Math.random() * roles.length)];

      // Reuse 70% of users across projects (except p==1)
      let existingUser = null;
      if (p > 1 && Math.random() < 0.7 && sharedUserPool.length > 0) {
        existingUser = sharedUserPool[Math.floor(Math.random() * sharedUserPool.length)];
        if (!existingUser.project.includes(project._id)) {
          existingUser.project.push(project._id);
          await existingUser.save();
        }
        projectUsers.push(existingUser);
        continue;
      }

      const user = await User.create({
        name,
        email: `${name.toLowerCase()}@company.com`,
        role,
        project: [project._id]
      });

      allUsers.push(user);
      projectUsers.push(user);
      sharedUserPool.push(user);
    }

    // --- Create Tasks
    const taskList = [];
    for (let t = 1; t <= 6; t++) {
      const assignedTo = getRandom(projectUsers.map(u => u._id), Math.floor(Math.random() * 2) + 1);
      const assignedBy = manager._id;

      const task = await Task.create({
        description: `Task ${t} of Project ${p}`,
        deadline: new Date(`2025-0${9 + p}-${10 + t}`),
        status: randomStatus(),
        project: project._id,
        assignedBy,
        assignedTo
      });

      taskList.push(task);
    }

    // --- Add comments to 4 tasks (2 with nested)
    const commentTasks = getRandom(taskList, 4);
    for (let i = 0; i < commentTasks.length; i++) {
      const task = commentTasks[i];
      const commenter = getRandom(projectUsers, 1)[0];

      const c1 = await Comment.create({
        body: `Initial comment on ${task.description}`,
        task: task._id,
        user: commenter._id
      });

      // Add nested replies for 2 of them
      if (i < 2) {
        const replier = getRandom(projectUsers.filter(u => u._id !== commenter._id), 1)[0];
        const c2 = await Comment.create({
          body: `Replying to: ${c1.body}`,
          task: task._id,
          user: replier._id,
          parent: c1._id
        });

        await Comment.create({
          body: `Replying to: ${c2.body}`,
          task: task._id,
          user: commenter._id,
          parent: c2._id
        });
      }
    }
  }

  console.log('✅ Seeding complete');
  console.log(`Projects: ${allProjects.length}`);
  console.log(`Users: ${allUsers.length}`);
  const taskCount = await Task.countDocuments();
  const commentCount = await Comment.countDocuments();
  console.log(`Tasks: ${taskCount}`);
  console.log(`Comments: ${commentCount}`);
  process.exit(0);
};

seed();
