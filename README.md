# Generating Blessings AI

This project uses artificial intelligence to generate custom blessings for various occasions. It's designed to provide personalized blessings in a creative and meaningful way.

## Features

- **Personalized Blessings**: Input relevant information, and the AI generates a unique blessing tailored to the event.
- **Various Occasions**: Suitable for birthdays, weddings, holidays, and other special moments.
- **Easy to Use**: Simple interface for generating and viewing blessings.

## Technologies Used

- **React**: Frontend framework used for building the user interface.
- **Node.js**: Backend server that handles API requests.
- **OpenAI API**: Generates the blessings using AI capabilities.
- **Axios**: Handles HTTP requests for interacting with the OpenAI API.
- **Firebase**: Used for deployment and hosting.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Firebase CLI (for deployment)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/6tehila/Generating-blessings-AI.git
    cd Generating-blessings-AI
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create an `.env` file in the root directory with your OpenAI API key:
    ```
    REACT_APP_OPENAI_API_KEY=your-api-key-here
    ```

4. Run the project:
    ```bash
    npm start
    ```

## Deployment

To deploy the project on Firebase, follow these steps:

1. Build the project:
    ```bash
    npm run build
    ```

2. Initialize Firebase in your project folder:
    ```bash
    firebase init
    ```

3. Deploy the project:
    ```bash
    firebase deploy
    ```

## Contributing

Feel free to submit pull requests or open issues to improve this project.

## License

This project is licensed under the MIT License.
