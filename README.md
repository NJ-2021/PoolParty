# PoolParty
Liquidity provider's funds manager

## Features
- Utilise v4 hooks to put out-of-position funds into ERC4626 compatible vaults
- ERC7579-compatible Auto-compounding module
- Safe with 4337, 7579 implementation
- Embedded wallets with Dynamic



<div align="center">

  <img src="app/client/src/images/Crtlg.png" alt="logo" width="200" height="auto" />
  <h1>Pool Party</h1>
  
  <p>
    A crowdfunding launchpad platform 
  </p>
  
<!-- Badges -->
<p>
  <a href="https://github.com/PLEARN-ESG/ESGROW/network/members">
    <img src="https://img.shields.io/github/forks/Louis3797/awesome-readme-template" alt="forks" />
  </a>
  <a href="https://github.com/PLEARN-ESG/ESGROW/stargazers">
    <img src="https://img.shields.io/github/stars/Louis3797/awesome-readme-template" alt="stars" />
  </a>
  <a href="https://github.com/PLEARN-ESG/ESGROW/issues">
    <img src="https://img.shields.io/github/issues/Louis3797/awesome-readme-template" alt="open issues" />
  </a>
</p>
   
<h4>

  
  </h4>
</div>

<br />

<!-- Table of Contents -->
# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
  * [Problem](#bomb-Problem)
  * [Solution](#woman_technologist-Solution)
  * [Deployed Dapp URL](#link-Deployed-Dapp-URL)
  * [Screenshots](#camera-screenshots)
  * [Tech Stack](#space_invader-tech-stack)
  * [Features](#dart-features)
  * [Color Reference](#art-color-reference)
  * [Environment Variables](#key-environment-variables)
- [Getting Started](#toolbox-getting-started)
  * [Prerequisites](#bangbang-prerequisites)
  * [Installation](#gear-installation)
  * [Run Locally](#running-run-locally)
  * [Deployment](#triangular_flag_on_post-deployment)
  * [Smart Contract](#exploding_head-Smart-Contracts)
- [Roadmap](#compass-roadmap)
- [Team](#wave-Team)
- [Contact](#handshake-contact)
- [Useful Links](#link-Useful-Links)
  * [ESGROW Whitepaper](#scroll-ESGROW-Whitepaper)
  * [Demo](#cinema-Demo)
- [Acknowledgments](#gem-Acknowledgements)

  

<!-- About the Project -->
## :star2: About the Project
ESGROW is a launchpad platform where users can join to submit their own SDGs- related projects. By participating in Impact Investing with the express goal of generating and measuring mission-related social, environmental or economic change alongside financial return then can participate in crowdfunding to help them raise funds for their projects through voting, minting NFTs, and raising funds from the NFT marketplace. Capturing an appropriate return is critical to do so, as this will ensure that the fund will be able to carry out the interests of the users by building stronger alliances with frontline communities most greatly impacted by the extractive economy and working towards a just transition towards regenerative finance.


<!-- Problem -->
## :bomb: Problem
Regardless of the ongoing attention and the rise in SDGs investments, investors yet people with SDGs-related ideas are still finding challenges to collaborate. For investors, they find it challenging in finding a service provider who can provide them with the right information so they can make the right investment  decision and to be greenwashed by false information. From the entrepreneurs' side, they are trying to validate their ideas and provide the information that proves their SDGs-related projects.  

<!-- Solution -->
## :woman_technologist: Solution
We have created a crowdfunding launchpad platform, ESGROW. In ESGROW, we help both investors as well as entrepreneurs to grow. We aim to ESGROW together. Through introducing a solution where entrepreneurs can share their innovative solutions that are related to poverty, better education, gender equality, clean water and sanitation, life below the water, and climate action with the public for their new projects and involving the public, including investors, to decide if this is a valid idea or not, we have created a space for both parties to meet. We created the space for investors to also study the project before starting to invest in it. through ESGROW platform, everyone can vote for the project that can serve the society more and introduces more innovative solutions to the current problems.

Participants, before submitting their own projects, will go through a learning process. To learn about sustainable finance and how it affects our daily life decisions. This will also help them better understand the importance of the ESG in our daily 
life. We are creating a platform where entrepreneurs can learn and bring up innovative solutions and share them with the public with full transparency, which in return, investors can have full access to the data and information they need before starting investing their money. Participants, through the platform can submit innovative solutions in many different ESG categories and we give the opportunity to participate and choose the most innovative solution.



<!-- Deployed Dapp URL -->
## :link: Deployed Dapp URL 
   [http://esgapp.us-east-1.elasticbeanstalk.com/](http://esgdevnewapp-env.us-west-2.elasticbeanstalk.com/)



<!-- Screenshots -->
### :camera: Screenshots

<div align="center"> 
 
<img width="902" alt="Screenshot 2022-08-28 at 16 35 58" src="https://user-images.githubusercontent.com/107268440/187079540-d920c762-0bd8-4512-b457-70ce7e80b330.png">


</div>


<!-- TechStack -->
### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://tailwindcss.com/">TailwindCSS</a></li>
    
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
  <li><a href="https://aws.amazon.com/">Amazon DynamoDB</a></li>
  </ul>
</details>


<details>
<summary>Backend</summary>
  <ul> 
    <li><a href="https://aws.amazon.com/it/elasticbeanstalk/">Amazon Cloud Elastic-beanstalk</a></li>
    <li><a href="https://www.nodejs.org/">Nodejs</a></li>
  </ul>
</details>


<details>
<summary>Web3</summary>
  <li><a href="https://hardhat.org/">Hardhat</a></li>
  <li><a href="https://chain.link/keepers/">Chainlink</a></li>
  <li><a href="https://docs.ethers.io/v5/">Etherjs</a></li>
  <ul> 
</details>
  
  <details>
<summary>AWS Tools</summary>
    
  - Amazon Elastic Compute Cloud (EC2)
    
  - AWS Identity and Access Management (IAM)
    
  - AWS Elastic Beanstalk
    
  - Legal Entity Identifier (LEI)
    
  - Legal Entity Reference Data (LE-RD)
    <ul> 
</details>
    
  <details>
<summary>Challenges and Solutions</summary>
  1- Airdrops:
    
      - Solution: We have used chainlink to automate the "airdrop" function of the smart contracts
  <ul> 
</details>

  
  
  
  
  
  
<!-- Features -->
## :dart: Features

#### ESGROW Participation conditions

- Participation is open to the public and anyone who has an ESG-related idea and thinks that it could become a succeful project can participate and submit it
- Each participant will be allowed to submit only one project 
- Maximum number of accepted projects is 50 
- Community will vote to choose 10 out of 50 projects
- Each token holder has 2 votes
- Batches: 3-4 batches/year

#### Process: 

- Ideas: people submit their projects
- Voting: community votes 
- NFT: Minting NFT for the winning projects
- Funding: get funds through  the NFT marketplace


---
#### Stages of a proposal

**1- Proposals**
People can submit their idea/project through a form.

 **Form:**
   - Name of the projects
   - ESG category
   - Brief description of the idea 
   - Link to the main documents

**2- Voting**
- Projects will be subject to the community voting system. Community members, once the projects are submitted and after the submission period, will be able to check all the projects and start voting. Each community member will only have two votes; meaning that they can only vote for a maximum of two projects or can vote twice for the same project. Transferring tokens are not allowed during the voting process.

**Results announcement**
- After the voting period deadline, the number of votes will be displayed on the dashboard so all community can see the results and winning projects
- Winners will be invited to an interview with ESGROW team to introduce themselves
- NFT will be minted for the winning projects to represent the idea of the project
- This NFT will be fractionalized.
- NFT will be listed in the marketplace
- Some of the NFT fractions will be distributed to community members who have voted for the winning projects


**NFT Fractionalization features for the winning project**:

--Liquidity
--Ultimate price

**Funding**:
- Funding projects will be split into 3 phases:
- 30% to fund the project’s first phase 
- 40% to fund the project’s second phase
- 30% to fund the project’s 3rd and last phase

---
  
#### Challenges we ran into
We are facing the challenges of transferring the technology from Web 2 to Web 3. Our biggest challenge was the FNFT smart contrats, as this subbject is new to the team, we were facing some difficulties in building smart contracts, however, witht the support and the collaboration between team members, we were able to overcome this issue.

#### Accomplishments that we're proud of
The collaboration of the team made achieving the milestones of the project in a short period of time and within the deadline feasible. 

#### What we learned
We have learned about the GameFi market, the Web 3 ecosystem, and how to integrate sustainable finance in blockchain to create a useful product. We have also learned about the FNFT which is a new topic for our team, however, we have managed to run, the FNFT smart contract, successfully.

#### What's next for ESGROW?
ESGROW will be part of a bigger project, **PLEARN**, which is a game aims at teaching financial literacy. ESGROW, will present the fourth pillar of the game which is the ESG-related projects deal. Once it is integrated into the game, participants will have the chance to learn about the importance of sustainable finance in making their financial decisions.

---
### GOVERNANCE 

 **Governance Token**
 
   - **MANI**: is the governance token of the main project, **PLEARN ( PLAY.LEARN.EARN)**
     Users can acquire MANI either through buying it directly from the platform, or through the completion of the learning process when they play PLEARN.
     Only users who hold MANI can participate in submitting/voting process. We will airdrop users with two tokens in order to partipiate in both the submission and the voting process. However, these tokens can be used to vote twice, including their own project.
     
     <img width="3666" alt="ESGROW-2" src="https://user-images.githubusercontent.com/107268440/182330039-abe56a43-b778-473f-a109-26fc41f4cd5d.png">

---
<!-- Color Reference -->
### :art: Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Primary Color | Green #afd9d5 |
| Secondary Color | Grass green #7ed957 |
| Text Color | White #ffffff |


<!-- Env Variables -->
### :key: Environment Variables

To run ESGROW, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`

<!-- Getting Started -->
## 	:toolbox: Getting Started

<!-- Prerequisites -->
### :bangbang: Prerequisites

This project uses Node as package manager

```bash
 npm install
```

<!-- Installation -->
### :gear: Installation

Install dependencies with npm

```bash
  npm install 
  cd app/client
```
   


<!-- Run Locally -->
### :running: Run Locally

Clone the project

```bash
  git clone [https://github.com/Louis3797/awesome-readme-template.git](https://github.com/PLEARN-ESG/ESGROW)
```

Go to the project directory

```bash
  cd app/client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run client
```


<!-- Deployment -->
### :triangular_flag_on_post: Deployment

To deploy this project run

```bash
  npx hardhat deploy
```


<!-- Smart Contract -->
## :exploding_head: Smart Contracts

- **NFT Minting Contract Address (ERC115):**  
- 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
- **Marketplace Contract address:**
- 0xbADDE1C2caa34F681515A2d221d1Bb7Af41C2E99
- **Management Contract Address:**
- 0x9Ffe65ca50985eE803cA8C03D4848C979604f459 
- **MANI Contract Address:**
- 0x71f3513a72fB7e1DE3c8F3Fd55F8D92adCe0a1D4 
 

<!-- Roadmap -->
## :compass: Roadmap

* :white_check_mark: Readme
* :white_check_mark: Canva sketching
* :white_check_mark: Front-end design
* :white_check_mark: MANI token smart contract 
* :white_check_mark: Managment contract
* :white_check_mark: Voting and minting smart contract 
* :white_check_mark: Hardhat deployment
* :white_check_mark: Demo video 


<!-- Team -->
## :wave: Team

| Member | Title | Description | Linkedin | GitHub   |
| ----------- | ----------- | ----------- |----------- |----------- |
| Nada Jabr | Project Leader | Manage project content |https://www.linkedin.com/in/nada-jabr-15838b39/ | NJ-2021 - CryptoStein |
| Paul Oamen | Technical Advisor | Advise on front-end and back-end technicals|https://www.linkedin.com/in/paule-oamen/ | AgentPoles |
| Thanh Nguyen | Product Coordinator | Coordinate the project technicals | https://www.linkedin.com/in/nguyenphuocxuanthanh/ |zoeynguyen1719 |
| Samuel Anthony | Full-stack Developer| Design UI, UX| https://www.linkedin.com/in/sathelle/ | Topichido |
| Ogunsakin Tope | Solidity Developer | Smart contract coding|https://www.linkedin.com/in/tope-emmanuel-ogunsakin/ | thellecodes |




<!-- Contact -->
## :handshake: Contact

  - Email: adm.cryptostein@gmail.com
  - Twitter: @stein_crypto


  <!-- Useful Links -->
## :link: Useful Links
 
  - ## :scroll: ESGROW Whitepaper 
        https://docs.google.com/document/d/1JVMET61GD3n7xs2gfhmULavI5wp_C5SPlk7vNi9hGjQ/edit
   <!-- Demo -->
  - ## :cinema: Demo
  [https://www.youtube.com/watch?v=VwvrdoV2_Bs](https://www.youtube.com/watch?v=dsP6ogSsLFM)
  
<!-- Acknowledgments -->
## :gem: Acknowledgements

 - [Readme Template](https://github.com/Louis3797/awesome-readme-template/)
 - [Polygon](https://polygon.technology/)
 - [Hardhat](https://hardhat.org/)
 - [Ekolance](https://www.ekolance.io/)
 

