import React, { useState } from 'react';
import { Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';
import './AiGenerator.css';

const AiGenerator = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [eventType, setEventType] = useState('');
  const [blessingType, setBlessingType] = useState('');
  const [moodType, setMoodType] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetchPrompts('http://localhost:5000/prompts', {
      'event-type': eventType,
      'blessing-type': blessingType,
      'mood-type': moodType
    });
  };

  const handleAnotherRequest = async (event) => {
    event.preventDefault();
    await fetchPrompts('http://localhost:5000/another', {
      'event-type': eventType,
      'blessing-type': blessingType,
      'mood-type': moodType
    });
  };

  const fetchPrompts = async (url, body) => {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorBody = await res.text();
        console.error('Error response:', errorBody);
        throw new Error(`HTTP error! status: ${res.status}, body: ${errorBody}`);
      }
      const data = await res.text();
      setResponse(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setResponse(null);
    }
  };
  
  return (
    <div className="ai-generator-page">
      <Card className="blessing-card">
        <CardContent className="card-content">
          <Typography variant="h4" component="h1" className="card-title" align="center">
            מחלק ברכות לכל סוגי האירועים
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth className="form-control" sx={{ marginBottom: '1.2rem', width: '100%' }}>
              <InputLabel id="event-type-label">בחר אירוע</InputLabel>
              <Select
                labelId="event-type-label"
                id="event-type"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                label="בחר אירוע"
              >
                <MenuItem value="anniversary">יום נישואין</MenuItem>
                <MenuItem value="birthday">יום הולדת</MenuItem>
                <MenuItem value="wedding">חתונה</MenuItem>
                <MenuItem value="graduation">סיום לימודים</MenuItem>
                <MenuItem value="recovery">החלמה ממחלה</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth className="form-control" sx={{ marginBottom: '1.2rem', width: '100%' }}>
              <InputLabel id="blessing-type-label">בחר סוג ברכה</InputLabel>
              <Select
                labelId="blessing-type-label"
                id="blessing-type"
                value={blessingType}
                onChange={(e) => setBlessingType(e.target.value)}
                label="בחר סוג ברכה"
              >
                <MenuItem value="long">ארוכה</MenuItem>
                <MenuItem value="short">קצרה</MenuItem>
                <MenuItem value="poem">שיר</MenuItem>
                <MenuItem value="letter">מכתב</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth className="form-control" sx={{ marginBottom: '1.2rem', width: '100%' }}>
              <InputLabel id="mood-type-label">בחר אווירה</InputLabel>
              <Select
                labelId="mood-type-label"
                id="mood-type"
                value={moodType}
                onChange={(e) => setMoodType(e.target.value)}
                label="בחר אווירה"
              >
                <MenuItem value="serious">רצינית</MenuItem>
                <MenuItem value="light">קלילה</MenuItem>
                <MenuItem value="funny">מצחיקה</MenuItem>
                <MenuItem value="happy">שמחה</MenuItem>
              </Select>
            </FormControl>

            <Button className="submit-button" variant="contained" type="submit">
              כתוב לי ברכה
            </Button>
          </form>

          {response && (
            <Box className="output">
              <Typography variant="h5" component="h2" gutterBottom>הברכה שלי</Typography>
              <Typography variant="body1" component="pre" className="prompt-text">
                {response}
              </Typography>
              <form onSubmit={handleAnotherRequest}>
                <Button className="submit-button" variant="contained" type="submit">
                  אני רוצה משהו אחר
                </Button>
              </form>
            </Box>
          )}

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              שגיאה: {error}
            </Typography>
          )}
        </CardContent>
      </Card>

      <footer className="footer">
        <CopyrightIcon className="footer-icon" />
        <Typography variant="h6">All rights reserved to Tehila 2024</Typography>
      </footer>
    </div>
  );
};

export default AiGenerator;
