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

  const adjustVolume = $((_: InputEvent, i: HTMLInputElement) => {
    volume.value = parseInt(i.value) / 100;
    isMuted.value = (volume.value <= 0);
  });

  const adjustProgress = $((_: InputEvent, i: HTMLInputElement) => {
    progress.value = {...progress.value, elapsed: parseInt(i.value)}
  });

  function formatTime(seconds: number) {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toFixed(0).toString().padStart(2, '0')}`;
  }

  function normalizeProgress(value: number) {
    return (value / progress.value.total) * 100;
  }

  function checkVolume() {
    return isMuted.value ? 0 : (volume.value * 100);
  }

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
                {formatTime(progress.value.elapsed)}
              </div>
              <input
                class="progress-bar"
                type="range"
                min="0"
                max={progress.value.total}
                value={progress.value.elapsed}
                onInput$={adjustProgress}
                id="progress"
                style={{
                  background: `linear-gradient(to right, #7a90ff ${normalizeProgress(progress.value.elapsed)}%, #aaa ${normalizeProgress(progress.value.elapsed)}%)`
                }}
              />
              <div class="total-time">
                {formatTime(progress.value.total)} 
              </div>
            </div>
          </div>
        </div>

        <div class="right">
          <div class="volume" title={`${(volume.value * 100).toFixed(0).toString()}%`}>
            <div class="volume-icon" onClick$={toggleMute}>
              {
                (volume.value === 0 || isMuted.value) ? <BsVolumeMuteFill /> :
                volume.value < 0.5 ? <BsVolumeDownFill /> :
                <BsVolumeUpFill />
              }
            </div>
            <input
              class="volume-bar"
              type="range"
              min="0"
              max="100"
              value={checkVolume()}
              onInput$={adjustVolume}
              id="volume"
              style={{
                background: `linear-gradient(to right, #7a90ff ${checkVolume()}%, #aaa ${checkVolume()}%)`
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
});
