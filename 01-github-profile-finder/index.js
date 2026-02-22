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
    .then((data) => {
     console.log(data);
     const userdata = document.createElement("div");
     userdata.className =
       "w-full max-w-[900px] flex flex-col border border-red mt-4 rounded-lg h-auto bg-black text-white";
       userdata.innerHTML = `
        <!-- header -->
         <div class="flex flex-row items-center justify-between w-full">
         <!-- header-left -->
         <div class="flex flex-row items-center gap-4">
        <!-- header-img-banner -->
          <div class="border border-brown border-4 rounded-full h-[150px] w-[150px] overflow-hidden">
          <img src=${data?.avatar_url} class="w-full h-full object-cover" />
          </div>
          <!-- header-user-data -->
          <div class="flex flex-col items-start gap-2">
          <h1 class="text-3xl text-white font-bold">${data?.name || data?.login}</h1>
          <h3 class="text-xl tetx-white font-bold">@${data?.login}</h3>
          </div>

         </div>

        <!-- header-right -->
        <a href=${
          data?.html_url
        } target="_blank"
        class="h-[60px] w-[180px] rounded-lg bg-white text-black text-center flex items-center justify-center text-xl">visit portfolio</a>
           </div>
       `;

       document.querySelector(".userDataWrapper").appendChild(userdata);
    })
    .catch((err) => {
      console.log("Error:", err);
    });
});
