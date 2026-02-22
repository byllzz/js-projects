const getUserDetails = document.querySelector("#getUserBtn");


getUserDetails.addEventListener("click" , () => {
  const input = document.querySelector("#userInput");
  let username = input?.value.trim();
  if(!username) return console.log("Please enter username!");
  let url = `https://api.github.com/users/${username}`;
  let user = fetch(url)
    .then((resonse) => {
      if (!resonse.ok) {
        throw new Error("User not found");
      }
      return resonse.json();
    })
    .then(async (data) => {
      const wrapper = document.querySelector(".userDataWrapper");
      wrapper.innerHTML = `
<div class="flex justify-center items-center h-40">
  <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
</div>
`;
      wrapper.innerHTML = "";

      // Create Main Card
      const userdata = document.createElement("div");

      userdata.className =
        "w-full flex flex-col border border-gray-700 mt-6 rounded-2xl p-6 bg-gray-900 text-white shadow-xl animate-fadeIn";

      //  Fetch User Repos
      const repoRes = await fetch(data.repos_url);
      const repos = await repoRes.json();
      const latestRepos = repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5);

      // Build Repo List
      const repoList = latestRepos
        .map(
          (repo) => `
      <a href="${repo.html_url}" target="_blank"
        class="bg-gray-800 p-4 rounded-xl hover:bg-blue-600 transition flex justify-between">

        <span class="font-semibold">${repo.name}</span>

        <span>⭐ ${repo.stargazers_count}</span>

      </a>
    `,
        )
        .join("");

      // Insert HTML
      userdata.innerHTML = `

    <!-- HEADER -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-6">

      <div class="flex items-center gap-6">

        <div class="rounded-full h-[140px] w-[140px] overflow-hidden border-4 border-blue-500">
          <img src="${data.avatar_url}" class="w-full h-full object-cover"/>
        </div>

        <div class="flex flex-col gap-2">
          <h1 class="text-3xl font-bold">
            ${data.name || data.login}
          </h1>

          <p class="text-gray-400 text-lg">
            @${data.login}
          </p>

          <p class="text-sm text-gray-300">
            ${data.bio || "No bio available"}
          </p>
        </div>

      </div>

      <a href="${data.html_url}" target="_blank"
        class="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition font-semibold">
        Visit Profile
      </a>

    </div>


    <!-- DETAILS -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 text-center">

      <div class="bg-gray-800 p-4 rounded-xl">
        <h3 class="text-xl font-bold">${data.public_repos}</h3>
        <p class="text-gray-400">Repos</p>
      </div>

      <div class="bg-gray-800 p-4 rounded-xl">
        <h3 class="text-xl font-bold">${data.followers}</h3>
        <p class="text-gray-400">Followers</p>
      </div>

      <div class="bg-gray-800 p-4 rounded-xl">
        <h3 class="text-xl font-bold">${data.following}</h3>
        <p class="text-gray-400">Following</p>
      </div>

      <div class="bg-gray-800 p-4 rounded-xl">
        <h3 class="text-xl font-bold">
          ${data.location || "Unknown"}
        </h3>
        <p class="text-gray-400">Location</p>
      </div>

    </div>


    <!-- REPOSITORIES -->
    <div class="mt-10">
      <h2 class="text-2xl font-bold mb-4"> Top Repositories</h2>

      <div class="flex flex-col gap-4">
        ${repoList || "<p>No repositories found</p>"}
      </div>

    </div>

  `;

      wrapper.appendChild(userdata);
    })
    .catch((err) => {
      console.log("Error:", err);
    });
});
