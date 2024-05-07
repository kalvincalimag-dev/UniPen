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
![Admin Side - Home](https://github.com/kalvincalimag-dev/UniPen/assets/121149046/b23909c7-ee4a-4912-94f6-672541241ba2)

- **Admin Panel - Create/Edit Article**:
![Admin Side - Edit Article](https://github.com/kalvincalimag-dev/testrepo/assets/121149046/f09e3964-dfe7-4f93-a0a8-7303f2d6213f)

- **Mobile User**:
![Mobile Collage](https://github.com/kalvincalimag-dev/testrepo/assets/121149046/4fb97b35-2379-476d-b75a-d7dcf7497a1c)

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
