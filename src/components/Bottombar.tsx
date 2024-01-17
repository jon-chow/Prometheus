import { component$, useSignal, useStyles$, $ } from '@builder.io/qwik';
import { BsPlayFill, BsPauseFill, BsSkipForwardFill, BsSkipBackwardFill, BsShuffle, BsRepeat, BsRepeat1, BsVolumeUpFill, BsVolumeDownFill, BsVolumeMuteFill } from '@qwikest/icons/bootstrap';
import styles from './Bottombar.scss?inline';

interface Props {

}

export default component$((props: Props) => {
  useStyles$(styles);

  enum RepeatMode {
    Off=0,
    Repeat=1,
    RepeatOne=2,
  }

  const repeatMode = useSignal(RepeatMode.Off);
  const shuffleToggled = useSignal(false);
  const isPlaying = useSignal(false);
  const isMuted = useSignal(false);

  const progress = useSignal({ elapsed: 30, total: 60 }); // replace with async Resource
  const volume = useSignal(0.5);

  const switchRepeatMode = $((e: MouseEvent) => {
    repeatMode.value = (repeatMode.value + 1) % 3;
  });

  const toggleShuffle = $((e: MouseEvent) => {
    shuffleToggled.value = !shuffleToggled.value;
  });

  const togglePlay = $((e: MouseEvent) => {
    isPlaying.value = !isPlaying.value;
  });

  const toggleMute = $((e: MouseEvent) => {
    isMuted.value = !isMuted.value;
  });

  return (
    <>
      <div class="bottombar">
        <div class="left">
          <div class="art-cover">
            <img src="https://iili.io/HlHy9Yx.png" alt="" />
            <div class="art-cover-overlay">
              <button class="play-button" onClick$={togglePlay}>
                {isPlaying.value ? <BsPauseFill /> : <BsPlayFill /> }
              </button>
            </div>
          </div>
          <div class="song-info">
            <div class="song-name">Song name</div>
            <div class="artist-name">Artist name</div>
          </div>
        </div>

        <div class="center">
          <div class="player">
            <div class="controls">
              <button class={"shuffle-button" + (shuffleToggled.value ? ' enabled' : '')} onClick$={toggleShuffle}>
                <BsShuffle />
              </button>
              <button class="skip-button"><BsSkipBackwardFill /></button>
              <button class="play-button" onClick$={togglePlay}>
                {isPlaying.value ? <BsPauseFill /> : <BsPlayFill /> }
              </button>
              <button class="skip-button"><BsSkipForwardFill /></button>
              <button class={"repeat-button" + (repeatMode.value === RepeatMode.Off ? '' : ' enabled')} onClick$={switchRepeatMode}>
                {repeatMode.value === RepeatMode.RepeatOne ? <BsRepeat1 /> : <BsRepeat />}
              </button>
            </div>

            <div class="progress">
              <div class="time-elapsed">
                {
                  `${Math.floor(progress.value.elapsed / 60)}:${(progress.value.elapsed % 60).toString().padStart(2, '0')}`
                }
              </div>
              <div class="progress-bar">
                <div class="progress-bar-fill"
                  style={{
                    width: `${progress.value.elapsed / progress.value.total * 100}%`
                  }}
                >
                  <span class="progress-bar-thumb" />
                </div>
              </div>
              <div class="total-time">
                {
                  `${Math.floor(progress.value.total / 60)}:${(progress.value.total % 60).toString().padStart(2, '0')}`
                }
              </div>
            </div>
          </div>
        </div>

        <div class="right">
          <div class="volume">
            <div class="volume-icon" onClick$={toggleMute}>
              {
                (volume.value === 0 || isMuted.value) ? <BsVolumeMuteFill /> :
                volume.value < 0.5 ? <BsVolumeDownFill /> :
                <BsVolumeUpFill />
              }
            </div>
            <div class="volume-bar">
              <div class="volume-bar-fill"
                style={{
                  width: `${!isMuted.value ? (volume.value * 100) : 0}%`
                }}
              >
                <span class="volume-bar-thumb" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
