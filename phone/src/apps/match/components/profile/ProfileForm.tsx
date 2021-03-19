import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import Nui from '../../../../os/nui-events/utils/Nui';
import { FormattedProfile } from '../../../../../../typings/match';
import ProfileField from '../../../../ui/components/ProfileField';
import UpdateButton from '../../../../ui/components/UpdateButton';
import { Card } from '@material-ui/core';
import Profile from './Profile';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    width: '100%',
    height: 'calc(100% - 40px)',
    padding: '15px',
  },
  card: {
    position: 'absolute',
    margin: '15px 15px 25px 15px',
    height: 'calc(100% - 80px)',
    width: 'calc(100% - 30px)',
    overflow: 'hidden',
  },
  spacer: {
    height: '8px',
  },
});

interface IProps {
  profile: FormattedProfile;
  showPreview: boolean;
}

export function ProfileForm({ profile, showPreview }: IProps) {
  const classes = useStyles();
  const { t } = useTranslation();

  // note that this assumes we are defensively checking
  // that profile is not null in a parent above this component.
  // Annoyingling adding conditionals above this line to not render
  // when profile === null results in a react error that different
  // amounts of hooks are rendering
  const [image, setImage] = useState(profile.image || '');
  const [name, setName] = useState(profile.name || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [job, setJob] = useState(profile.job || '');
  const [location, setLocation] = useState(profile.location || '');
  const [tags, setTags] = useState(profile.tags || '');

  const update = {
    ...profile,
    image,
    name,
    bio,
    location,
    job,
    tagList: tags.split(',').map((tag) => tag.trim()),
  };

  const handleUpdate = () => {
    console.log(update);
    // Nui.send('phone:updateTwitterProfile', data);
  };

  if (showPreview) {
    return (
      <Card raised className={classes.card}>
        <Profile profile={update} />
      </Card>
    );
  }

  return (
    <div className={classes.root}>
      <ProfileField
        label={t('APPS_MATCH_EDIT_PROFILE_IMAGE')}
        value={update.image}
        handleChange={setImage}
        allowChange
      />
      <ProfileField label={t('APPS_MATCH_EDIT_PROFILE_NAME')} value={name} handleChange={setName} />
      <ProfileField
        label={t('APPS_MATCH_EDIT_PROFILE_BIO')}
        value={update.bio}
        handleChange={setBio}
        multiline
      />
      <ProfileField
        label={t('APPS_MATCH_EDIT_PROFILE_LOCATION')}
        value={update.location}
        handleChange={setLocation}
      />
      <ProfileField
        label={t('APPS_MATCH_EDIT_PROFILE_JOB')}
        value={update.job}
        handleChange={setJob}
      />
      <ProfileField
        label={t('APPS_MATCH_EDIT_PROFILE_JOB')}
        value={update.job}
        handleChange={setJob}
      />
      <ProfileField
        label={t('APPS_MATCH_EDIT_PROFILE_TAGS')}
        value={update.tags}
        handleChange={setTags}
      />
      <UpdateButton handleClick={handleUpdate} loading={false} />
    </div>
  );
}

export default ProfileForm;
