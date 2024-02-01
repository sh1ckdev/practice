import { useContext, useState } from 'react';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material';
import { Context } from "../index";
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProfileDialog = ({ open, onClose }) => {
    const navigate = useNavigate();
    const { store } = useContext(Context);
    const [fieldsToUpdate, setfieldsToUpdate] = useState({
        username: '',
        email: '',
        password: '',
        bio: '',
        avatar: '',
    });

    const handleChange = (field) => (event) => {
        setfieldsToUpdate({ ...fieldsToUpdate, [field]: event.target.value });
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result.split(',')[1];
                setfieldsToUpdate({
                    ...fieldsToUpdate,
                    avatar: `data:${file.type};base64,${base64Data}`,
                    avatarFile: file,
                    avatarBase64: base64Data,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOpenFileInput = () => {
        document.getElementById('avatar').click();
    };

    const handleSave = async () => {
        const userId = store.user.id
        await store.updateProfile(userId, fieldsToUpdate);
        navigate(`/account/${store.user.username}`);
        console.log('Сохранено:', fieldsToUpdate);
        onClose()
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
            <DialogTitle color="primary">Редактировать профиль</DialogTitle>
            <DialogContent>
                <Box>
                    <TextField
                        id="avatar"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleAvatarChange}
                    />
                    <IconButton onClick={handleOpenFileInput} component="span">
                        <Avatar
                            src={fieldsToUpdate.avatar || store.user.avatar}
                            alt="avatar"
                            style={{
                                width: 130,
                                height: 130,
                                borderRadius: 20,
                            }}
                        />
                    </IconButton>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <DialogContentText>Ваш никнейм</DialogContentText>
                <TextField
                    id="username"
                    placeholder={store.user.username}
                    value={fieldsToUpdate.username}
                    onChange={handleChange('username')}
                    margin="normal"
                />
                <DialogContentText>Ваш email</DialogContentText>
                <TextField
                    id="email"
                    placeholder={store.user.email}
                    value={fieldsToUpdate.email}
                    onChange={handleChange('email')}
                    margin="normal"
                />
                <DialogContentText>Ваш пароль</DialogContentText>
                <TextField
                    id="password"
                    type="password"
                    placeholder={`Введите новый пароль`}
                    value={fieldsToUpdate.password}
                    onChange={handleChange('password')}
                    margin="normal"
                />
                <DialogContentText>Ваш био</DialogContentText>
                <TextField
                    multiline
                    rows={4}
                    placeholder={store.user.bio}
                    value={fieldsToUpdate.bio}
                    onChange={handleChange('bio')}
                    margin="normal"
                />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={onClose}>Отмена</Button>
                <Button variant='contained' onClick={handleSave}>Сохранить</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProfileDialog;
