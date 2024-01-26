import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "./../index";
import {
    Typography,
    Box,
    Button,
    TextField,
    Rating,
    List,
    ListItem,
    ListItemText,
    useTheme,
    IconButton,
} from "@mui/material";
import { Container } from "@mui/system";
import { getDate, getTime } from "../scripts/formatDate.ts";
import DeleteIcon from '@mui/icons-material/Delete';


const Review = () => {
    const theme = useTheme();
    const { store } = useContext(Context);
    const [errorMessage, setErrorMessage] = useState(null);
    const [text, setText] = useState("");
    const [rating, setRating] = useState(0);
    const [visibleReviews, setVisibleReviews] = useState(3);

    const handleAddReview = async () => {
        if (!store.isAuth) {
            setErrorMessage("Вы не авторизованы. Пожалуйста, войдите в систему.");
            return;
        }
        if (!text || !rating) {
            setErrorMessage("Пожалуйста, заполните все поля.");
            return;
        }

        try {
            await store.addReview(store.user.username, text, rating);
            setText("");
            setRating(0);
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage("Произошла ошибка при добавлении обзора.");
            console.error(error);
        }
    };

    const handleDeleteReview = async (reviewId, username) => {
        try {
            await store.deleteReview(reviewId, username)
        } catch (error) {
            console.log("Произошла ошибка при удалении обзора.", error);
        }
    }

    useEffect(() => {
        store.getReviews();
    }, [store]);

    const handleShowMoreReviews = () => {
        setVisibleReviews(visibleReviews + 3);
    };

    return (
        <Container>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 10 }}>
                <Typography variant="h3">Оставить отзыв</Typography>
                <Typography sx={{ fontSize: 20 }}>
                    Ваш никнейм:
                    <Typography
                        variant="span"
                        color="primary"
                        sx={{ fontWeight: 600, fontSize: 30 }}
                    >
                        {" "}
                        {store.user.username}
                    </Typography>
                </Typography>
                <Box>
                    <Rating
                        defaultValue={0}
                        name="simple-controlled"
                        value={rating}
                        size="large"
                        color="primary"
                        onChange={(e) => setRating(Number(e.target.value))}
                    />
                </Box>
                <TextField
                    type="text"
                    placeholder="Текст отзыва"
                    id="whiteInput"
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    sx={{ backgroundColor: "white" }}
                />
                <Button variant="contained" onClick={handleAddReview}>
                    Добавить отзыв
                </Button>
                {errorMessage && (
                    <Typography sx={{ color: "red" }}>{errorMessage}</Typography>
                )}
            </Box>
            <Box sx={{ mt: 10 }}>
                <Typography variant="h3">Отзывы пользователей</Typography>
                <List>
                    {store.reviews
                        .slice()
                        .reverse()
                        .slice(0, visibleReviews)
                        .map((review) => (
                            <ListItem key={review._id} sx={{ display: 'flex', alignItems: 'flex-start', mb: 5, border: `1px solid ${theme.palette.primary.main}`, borderRadius: 2, p: 3, height: '100%' }}>
                                <ListItemText
                                    primary={
                                        <React.Fragment>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                                <Typography
                                                    variant="h5"
                                                    color="primary"
                                                >
                                                    {review.username}
                                                </Typography>
                                                <Rating
                                                    name="simple-controlled"
                                                    value={review.rating}
                                                    size="large"
                                                    readOnly
                                                />
                                            </Box>
                                        </React.Fragment>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            <Box sx={{ mx: 3 }}>
                                                <Typography
                                                    sx={{
                                                        display: "inline",
                                                        maxWidth: "100%",
                                                        wordWrap: "break-word",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                    component="span"
                                                    variant="body1"
                                                    color="text.primary"
                                                >
                                                    {review.text}
                                                </Typography>
                                            </Box>
                                        </React.Fragment>
                                    }
                                />
                                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between',  flex: 1    }}>
                                    <Box sx={{  }}>
                                    <Typography color="primary">
                                        {getTime(review.createdAt)}
                                    </Typography>
                                    <Typography>{getDate(review.createdAt)}</Typography>
                                    </Box>
                                    {store.user.username === review.username && (
                                    <IconButton aria-label="delete" onClick={() => handleDeleteReview(review.username, review._id)}>
                                    <DeleteIcon color="error" fontSize="large"/>
                                    </IconButton>
                                )}
                                </Box>
                            </ListItem>

                        ))}
                    {store.reviews.length > visibleReviews && (
                        <Button sx={{ mb: 5 }} variant="outlined" onClick={handleShowMoreReviews}>
                            Показать еще
                        </Button>
                    )}
                </List>
            </Box>
        </Container>
    );
};

export default observer(Review);
