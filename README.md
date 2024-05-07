# UniPen: University Organ/Journal Platform

This project consists of a mobile app for article viewing and a web admin panel for managing content for a university organ. It uses the MERN (MongoDB, Express.js, React.js, Node.js) stack along with cloudinary, multer, genymotion, and expo. Here's a glimpse of its key features:


- **Web Admin Panel**
    - Create and edit articles with thumbnail attachments.
    - Categorize articles by tags.
- **Mobile User Side**: 
    - View and search articles.
    - Recommend related posts based on tags.

## Installation Guide 

Follow these simple steps to set up UniPen on your local machine:

1. Clone the repository:

   ```bash
   git clone https://github.com/kalvincalimag-dev/UniPen.git
   ```

2. Open Terminal & Start the Backend API:
   ```
   cd backend 
   npm run dev 
   ```

3. Start the Web Admin Panel:
   ```
   cd admin 
   npm start 
   ```

3. Access the web app in your browser at http://localhost:8000/.

4. Start the Mobile Application 
   ```
   cd unipenapp
   npm start
   ```

    - This will generate a QR Code.
    - Download Expo from Google Play and scan the QR Code.
    - If Genymotion is downloaded and set up for VSCode, simply press 'a'.

## Visual Overview 

- **Admin Panel - Dashboard**:
![Admin Side - Home](https://github.com/kalvincalimag-dev/UniPen/assets/121149046/740a32a7-7a7a-4347-b3b1-2e06d80f79df)

- **Admin Panel - Create/Edit Article**:
![Admin Side - Edit Article](https://github.com/kalvincalimag-dev/UniPen/assets/121149046/c0024f80-9f4c-4f22-b638-d06ba55a9dfe)

- **Mobile User**:
![Mobile Collage](https://github.com/kalvincalimag-dev/UniPen/assets/121149046/eef81bd4-c30b-402d-8f02-5c140c4b2726)


## Technology Stack 

UniPen utilizes the following technologies to deliver the functionalities:

- **MongoDB**
- **Express.js** 
- **React.js**
- **Node.js**
- **Cloudinary**
- **Multer**
- **Axios**

## License

This project is licensed under the GNU General Public License - see the LICENSE file for details.
