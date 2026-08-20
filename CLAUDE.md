# CLAUDE.md

> Auto-generated from a working session; pending Jon's review.

## What this repo is

Jon's personal dotfiles. Each tool gets its own top-level directory holding the
config file(s) under their repo-relative name (no leading dot):

```
bash/bashrc          firefox/proxy.pac, proxy2.pac
ghostty/config, ghostty/themes/
git/gitconfig, gitignore, gitmessage, git-completion.bash, profile
irssi/config         iterm2/com.googlecode.iterm2.plist
mutt/muttrc, mutt/   screen/screenrc
tmux/tmux.conf       weechat/irc.conf
zsh/zshrc, zsh/zprofile
```

`zsh/zshrc` is a port of `bash/bashrc` — same sections in the same order, so
the two diff cleanly. Keep them in step when either changes. The port is not
line-for-line: prompt escapes (`\u` → `%n`, `\!` → `%!`, …) and `%{…%}` width
guards, `shopt` → `setopt`/`bindkey -e`, `HISTFILESIZE` → `SAVEHIST` +
`HISTFILE`, bash `complete -W` for ssh hosts → a `zstyle … hosts` after
`compinit`, and `read -p` → `read "var?prompt"`. Three bashrc bugs are fixed on
the zsh side only: `plot` used `exit 1` (killed the shell), `LESSOPEN` pointed
at a hardcoded Intel-Homebrew Cellar path, and PATH re-prepended itself in
nested shells (`typeset -U path`). `zsh/zprofile` holds login-shell-only setup
(Homebrew `shellenv`, arch-detected) and is sourced before `zsh/zshrc`.

## `./use` — the installer

`use` (bash, repo root) symlinks each file into the location its tool actually
reads. It is the single entry point; there is no Makefile or setup.sh.

```bash
./use            # all tools
./use git tmux   # only these
DRYRUN=1 ./use   # print what would happen, change nothing
```

Conventions inside `use`:

- One `use_<tool>()` function per tool; `ALL` lists the tool names and the
  dispatcher errors on an unknown name. Adding a tool = add the function and
  add its name to `ALL`.
- `link <repo-relative-src> <absolute-dst>` is the only primitive. It skips
  missing sources, `mkdir -p`s the destination's parent, moves a pre-existing
  *real* file to `<dst>.bak` (never clobbering an existing `.bak`), then
  `ln -sfn`.
- Tools that can't be symlinked print instructions instead:
  - **firefox** — no fixed PAC location; the PAC file path is pasted into
    Settings > Network Settings > Automatic proxy configuration URL.
  - **iterm2** — `cfprefsd` caches preferences and can overwrite a symlinked
    plist, so the symlink is best-effort and the supported route is
    Preferences > General > Preferences > "Load preferences from a custom
    folder or URL" pointed at `iterm2/`.
- **weechat** picks `~/.weechat/` if it exists, else XDG `~/.config/weechat/`.
- A few destinations are named by *other* config, not by the tool: `git/gitignore`
  → `~/.gitignore_global` (referenced by `core.excludesfile`) and
  `git/gitmessage` → `~/.gitmessage` (`commit.template`).

## Secrets

Every credential field in this repo is a **placeholder** meant to be edited
after checkout — `mutt/muttrc` (`imap_pass`/`smtp_pass` = `"password"`),
`git/gitconfig` (`[sendemail] smtppass = password`), `irssi/config`
(`nickserv identify <password>`), `weechat/irc.conf` (`password = "ChangeMe"`,
empty `sasl_password`). Jon's own name and public gmail address are
intentionally in `git/gitconfig` and `mutt/muttrc`. Keep it that way: never
commit a real credential here, and don't "fix" a placeholder by filling it in.

`firefox/proxy2.pac` is likewise sanitized — `0.0.0.0` subnet placeholders and
localhost SOCKS ports.
