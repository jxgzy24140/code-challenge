Thanks for this opportunity, I appreciate that. I'm also interested in the backend so below are descriptions of whole solutions.

- Solution 1:
  => To solve this problem i have 3 ways to approach, i used 2 built in js func and a tranditional loop to solve the problem.

- Solution 2:
  => When you clone this project to your local, first thing u need run install (yarn or npm depend on your preference). Then u can run it on http://localhost:3000/exchange.
  => In this solution i'm using AntD and TaildwindCss. I decided just use local state to solve this problem.
  => In this UI, we have 2 inputs. The left side will calculate the exchang rate and put it into the right input. In the center, we have a reverse button, when user click that it will reverse the currency between 2 inputs.

- Solution 3:
  => I just find out 2 places need to be optimized.

- Solution 4:
  => The same problem 1.

- Solution 5:
  => I designed full crud for 2 entites and aggerate data from them.
  => I'm using Typeorm and Mysql running on docker with a basic filter and RESTful styling. I also used AutoMapperCore for typescript for class tranformation.
  => To run it, after clone u can use yarn or npm to install required packages then you should config database option in "src/helpers/data-source" then run "tsc" to compile the code to javascript then run "npm or yarn start" default it'll run on "http://localhost:8000".

- Solution 6:
  => This solution using the same file with problem 2 and 5. After running the UI on your local then access to "http://localhost:3000/ranking" it's will show top 10 highest score.
  => Live update i have used socket.io to display that.
  => Switching the client to "http://localhost:3000/action" you must create some user at "http://localhost:3000/register" (default every user created with role is customer and has 0 scores, it has some basic validate on both client and server). Then login, the UI includes 3 buttons just click and it will dispatch an api to update current user logged in.
  => To prevent user cheating, i've used apply a middleware using jwt on update-user-score, must logged in users can do this for themself.

* SOLUTION 5 AND 6 USING THE SAME FILE.
